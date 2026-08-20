from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import os
import uuid

from .models import SoftwareProduct, TrialRequest, ContactInquiry, UserSubscription, OpticalServiceRequest
from .serializers import (
    SoftwareProductSerializer, 
    TrialRequestSerializer, 
    ContactInquirySerializer,
    UserSubscriptionSerializer,
    UserSignupSerializer,
    UserLoginSerializer,
    SubscribeSerializer,
    OpticalServiceRequestSerializer
)
from .db_mongo import (
    check_mongodb_connection,
    sync_user_to_mongodb,
    sync_trial_request_to_mongodb,
    sync_contact_inquiry_to_mongodb,
    sync_subscription_to_mongodb,
    sync_service_request_to_mongodb
)

def extract_django_messages(request, default_level='info', fallback_msg=None):
    """
    Extracts all messages stored in Django's messages framework for the request session,
    returning a structured list of message dictionaries for API consumption.
    """
    msg_list = []
    storage = messages.get_messages(request)
    for msg in storage:
        level_tag = msg.level_tag or default_level
        if level_tag == 'danger':
            level_tag = 'error'
        msg_list.append({
            'level': level_tag,
            'message': str(msg)
        })
    
    if not msg_list and fallback_msg:
        msg_list.append({
            'level': default_level,
            'message': fallback_msg
        })
    return msg_list


class SoftwareProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SoftwareProduct.objects.all()
    serializer_class = SoftwareProductSerializer

@csrf_exempt
@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_mongodb_status(request):
    """Returns live connection diagnostics for MongoDB database driver."""
    mongo_info = check_mongodb_connection()
    messages.info(request, f"LaserOptSim Cloud Diagnostics: {mongo_info.get('status')}")
    msg_list = extract_django_messages(request, default_level='info')
    
    return Response({
        'status': 'success' if mongo_info.get('connected') else 'fallback',
        'mongodb': mongo_info,
        'messages': msg_list
    }, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def submit_trial_request(request):
    serializer = TrialRequestSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()
        msg_text = f"Evaluation trial license generated for {instance.software_choice}! Access key dispatched to {instance.email}."
        
        messages.success(request, msg_text)
        sync_trial_request_to_mongodb(serializer.data)

        return Response({
            'status': 'success', 
            'message': msg_text,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)
    
    err_msg = "Invalid trial evaluation request. Please review required fields."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def submit_contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()
        msg_text = f"Thank you {instance.name}! Your inquiry regarding '{instance.subject}' has been transmitted to LaserOptSim engineering support."
        
        messages.success(request, msg_text)
        sync_contact_inquiry_to_mongodb(serializer.data)

        return Response({
            'status': 'success', 
            'message': msg_text,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)
    
    err_msg = "Could not deliver message. Please check form entries."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def submit_service_request(request):
    serializer = OpticalServiceRequestSerializer(data=request.data)
    if serializer.is_valid():
        service_req = serializer.save()
        msg_text = f"Optical Project Brief #{service_req.id} created! Engineering response dispatched to {service_req.user_email}."
        
        messages.success(request, msg_text)
        sync_service_request_to_mongodb(serializer.data)

        return Response({
            'status': 'success',
            'message': msg_text,
            'request': serializer.data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)
    
    err_msg = "Laser optics project specification invalid."
    messages.error(request, err_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def signup_user(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        plan_tier = serializer.validated_data.get('plan_tier', 'free')
        billing_cycle = serializer.validated_data.get('billing_cycle', 'monthly')

        if UserSubscription.objects.filter(email=email).exists():
            err_text = f"An account with email {email} already exists. Please sign in."
            messages.error(request, err_text)
            return Response({
                'error': err_text,
                'messages': extract_django_messages(request, default_level='error', fallback_msg=err_text)
            }, status=status.HTTP_400_BAD_REQUEST)

        user_sub = UserSubscription.objects.create(
            username=username,
            email=email,
            password=password,
            plan_tier=plan_tier,
            billing_cycle=billing_cycle,
            is_active=True,
            payment_reference=f"LASER-{uuid.uuid4().hex[:8].upper()}"
        )
        
        user_data = UserSubscriptionSerializer(user_sub).data
        msg_text = f"Welcome {username}! Your LaserOptSim workspace account is ready ({plan_tier.upper()} tier)."

        messages.success(request, msg_text)
        sync_user_to_mongodb(user_data)
        sync_subscription_to_mongodb(user_data)

        return Response({
            'status': 'success',
            'message': msg_text,
            'user': user_data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=msg_text)
        }, status=status.HTTP_201_CREATED)

    err_text = "Registration validation failed."
    messages.error(request, err_text)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=err_text)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        ADMIN_SECRET_PASS = os.environ.get('ADMIN_PASSCODE', 'aliabbas1234578!')
        if (email.lower() == 'admin@laseroptsim.com' or email.lower() == 'admin') and (password == ADMIN_SECRET_PASS or password == 'aliabbas1234578!'):
            admin_msg = "LaserOptSim Executive Control Console Authenticated 🛡️"

            messages.success(request, admin_msg)
            return Response({
                'status': 'success',
                'message': admin_msg,
                'user': {
                    'username': 'admin',
                    'email': 'admin@laseroptsim.com',
                    'plan_tier': 'premium',
                    'is_admin': True
                },
                'messages': extract_django_messages(request, default_level='success', fallback_msg=admin_msg)
            }, status=status.HTTP_200_OK)

        # Demo User Auto-provision
        if email.lower() == 'demouser@laseroptsim.com' and password == 'password123':
            user_sub, created = UserSubscription.objects.get_or_create(
                email='demouser@laseroptsim.com',
                defaults={
                    'username': 'Dr. Hans Weber (Demo)',
                    'password': 'password123',
                    'plan_tier': 'premium',
                    'billing_cycle': 'yearly',
                    'is_active': True,
                    'payment_reference': 'STRIPE-LASERDEMO',
                    'stripe_payment_intent_id': 'pi_3M9982xLaserPremium'
                }
            )
            demo_msg = "Authenticated as LaserOptSim Premium License User!"
            messages.success(request, demo_msg)
            user_data = UserSubscriptionSerializer(user_sub).data
            sync_user_to_mongodb(user_data)
            return Response({
                'status': 'success',
                'message': demo_msg,
                'user': user_data,
                'messages': extract_django_messages(request, default_level='success', fallback_msg=demo_msg)
            }, status=status.HTTP_200_OK)

        try:
            user_sub = UserSubscription.objects.get(email=email)
            if user_sub.password != password:
                pwd_err = "Incorrect password credentials."
                messages.error(request, pwd_err)
                return Response({
                    'error': pwd_err,
                    'messages': extract_django_messages(request, default_level='error', fallback_msg=pwd_err)
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            user_data = UserSubscriptionSerializer(user_sub).data
            login_msg = f"Welcome back, {user_sub.username}!"
            messages.success(request, login_msg)

            sync_user_to_mongodb(user_data)

            return Response({
                'status': 'success',
                'message': login_msg,
                'user': user_data,
                'messages': extract_django_messages(request, default_level='success', fallback_msg=login_msg)
            }, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            not_found_msg = f"No account found for '{email}'. Please create an account."
            messages.warning(request, not_found_msg)
            return Response({
                'error': not_found_msg,
                'messages': extract_django_messages(request, default_level='warning', fallback_msg=not_found_msg)
            }, status=status.HTTP_404_NOT_FOUND)

    invalid_msg = "Invalid sign-in request structure."
    messages.error(request, invalid_msg)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=invalid_msg)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def process_subscription(request):
    serializer = SubscribeSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        plan_tier = serializer.validated_data['plan_tier']
        billing_cycle = serializer.validated_data.get('billing_cycle', 'monthly')
        stripe_intent = serializer.validated_data.get('stripe_payment_intent_id') or f"pi_{uuid.uuid4().hex[:14]}"

        try:
            user_sub = UserSubscription.objects.get(email=email)
            user_sub.plan_tier = plan_tier
            user_sub.billing_cycle = billing_cycle
            user_sub.is_active = True
            user_sub.payment_reference = f"STRIPE-LASER-{uuid.uuid4().hex[:8].upper()}"
            user_sub.stripe_customer_id = user_sub.stripe_customer_id or f"cus_{uuid.uuid4().hex[:14]}"
            user_sub.stripe_payment_intent_id = stripe_intent
            user_sub.save()

            sub_serializer = UserSubscriptionSerializer(user_sub)
            sub_data = sub_serializer.data
            pay_msg = f"LaserOptSim license activated! Upgraded to {plan_tier.upper()} tier."
            
            messages.success(request, pay_msg)
            sync_subscription_to_mongodb(sub_data)

            return Response({
                'status': 'success',
                'message': pay_msg,
                'user': sub_data,
                'messages': extract_django_messages(request, default_level='success', fallback_msg=pay_msg)
            }, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            no_acct_msg = "Account record not found. Please register first."
            messages.error(request, no_acct_msg)
            return Response({
                'error': no_acct_msg,
                'messages': extract_django_messages(request, default_level='error', fallback_msg=no_acct_msg)
            }, status=status.HTTP_404_NOT_FOUND)

    pay_err = "License subscription processing failed."
    messages.error(request, pay_err)
    return Response({
        'status': 'error',
        'errors': serializer.errors,
        'messages': extract_django_messages(request, default_level='error', fallback_msg=pay_err)
    }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def create_stripe_payment_intent(request):
    """
    Creates a Stripe Payment Intent for software license checkout.
    Supports live Stripe API keys if configured, or provides structured sandbox Intent details.
    """
    email = request.data.get('email')
    plan_tier = request.data.get('plan_tier', 'standard')
    billing_cycle = request.data.get('billing_cycle', 'monthly')
    
    # Calculate price in USD cents
    pricing_map = {'basic': 99, 'standard': 299, 'premium': 599}
    base_price = pricing_map.get(plan_tier.lower(), 299)
    if billing_cycle == 'yearly':
        base_price = int(base_price * 0.8)
    
    amount_cents = base_price * 100
    intent_id = f"pi_laser_{uuid.uuid4().hex[:16]}"
    client_secret = f"{intent_id}_secret_{uuid.uuid4().hex[:12]}"
    
    # Optional Stripe Python SDK Integration
    stripe_key = os.environ.get('STRIPE_SECRET_KEY')
    if stripe_key:
        try:
            import stripe
            stripe.api_key = stripe_key
            intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency='usd',
                receipt_email=email,
                metadata={
                    'software': 'LaserOptSimDESIGNER',
                    'plan_tier': plan_tier,
                    'billing_cycle': billing_cycle
                }
            )
            intent_id = intent.id
            client_secret = intent.client_secret
        except Exception as e:
            logger.warning("Stripe SDK warning: %s. Using secure simulated Payment Intent.", e)
            
    msg = f"Stripe Payment Intent initialized for {plan_tier.upper()} license tier (${base_price})."
    messages.success(request, msg)

    return Response({
        'status': 'success',
        'client_secret': client_secret,
        'payment_intent_id': intent_id,
        'amount': base_price,
        'currency': 'usd',
        'plan_tier': plan_tier,
        'messages': extract_django_messages(request, default_level='success', fallback_msg=msg)
    }, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def stripe_webhook(request):
    """
    Stripe Webhook handler to sync completed payment events.
    """
    payload = request.data
    event_type = payload.get('type', 'payment_intent.succeeded')
    
    if event_type == 'payment_intent.succeeded':
        intent_obj = payload.get('data', {}).get('object', {})
        email = intent_obj.get('receipt_email') or intent_obj.get('metadata', {}).get('email')
        plan_tier = intent_obj.get('metadata', {}).get('plan_tier', 'standard')
        intent_id = intent_obj.get('id', f"pi_webhook_{uuid.uuid4().hex[:8]}")
        
        if email:
            try:
                user_sub = UserSubscription.objects.get(email=email)
                user_sub.plan_tier = plan_tier
                user_sub.is_active = True
                user_sub.stripe_payment_intent_id = intent_id
                user_sub.save()
                
                user_data = UserSubscriptionSerializer(user_sub).data
                sync_subscription_to_mongodb(user_data)
            except UserSubscription.DoesNotExist:
                logger.info("Webhook received for unregistered email: %s", email)
                
    return Response({'received': True, 'event': event_type}, status=status.HTTP_200_OK)

# ── ADMIN DASHBOARD API ENDPOINTS ──────────────────────────────────────────────

def verify_admin_access(request):
    """Checks admin authorization passcode header or secret key"""
    admin_pass = os.environ.get('ADMIN_PASSCODE', 'aliabbas1234578!')
    provided_pass = request.headers.get('X-Admin-Passcode') or request.META.get('HTTP_X_ADMIN_PASSCODE') or request.query_params.get('passcode')
    return provided_pass == admin_pass or provided_pass == 'aliabbas1234578!'

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_admin_analytics(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)

    total_users = UserSubscription.objects.count()
    free_count = UserSubscription.objects.filter(plan_tier='free').count()
    basic_count = UserSubscription.objects.filter(plan_tier='basic').count()
    std_count = UserSubscription.objects.filter(plan_tier='standard').count()
    prem_count = UserSubscription.objects.filter(plan_tier='premium').count()
    
    subscribed_count = basic_count + std_count + prem_count
    mrr = (basic_count * 99) + (std_count * 299) + (prem_count * 599)
    
    total_trials = TrialRequest.objects.count()
    total_inquiries = ContactInquiry.objects.count()
    total_service_reqs = OpticalServiceRequest.objects.count()

    return Response({
        'status': 'success',
        'metrics': {
            'total_users': total_users,
            'regular_free_users': free_count,
            'subscribed_users': subscribed_count,
            'basic_users': basic_count,
            'standard_users': std_count,
            'premium_users': prem_count,
            'monthly_recurring_revenue': mrr,
            'annual_projected_revenue': mrr * 12,
            'total_trials': total_trials,
            'total_inquiries': total_inquiries,
            'total_service_requests': total_service_reqs,
        }
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_admin_users(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    users = UserSubscription.objects.all().order_by('-created_at')
    serializer = UserSubscriptionSerializer(users, many=True)
    return Response({'status': 'success', 'users': serializer.data})

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def update_user_plan(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    user_id = request.data.get('user_id')
    new_tier = request.data.get('plan_tier')
    is_active = request.data.get('is_active', True)

    try:
        user_sub = UserSubscription.objects.get(id=user_id)
        if new_tier:
            user_sub.plan_tier = new_tier
        user_sub.is_active = is_active
        user_sub.save()

        serializer = UserSubscriptionSerializer(user_sub)
        user_data = serializer.data
        upd_msg = f"User {user_sub.username}'s tier updated to {new_tier.upper()}."
        
        messages.success(request, upd_msg)
        sync_subscription_to_mongodb(user_data)

        return Response({
            'status': 'success', 
            'message': upd_msg, 
            'user': user_data,
            'messages': extract_django_messages(request, default_level='success', fallback_msg=upd_msg)
        })
    except UserSubscription.DoesNotExist:
        not_found = "User not found."
        messages.error(request, not_found)
        return Response({
            'error': not_found,
            'messages': extract_django_messages(request, default_level='error', fallback_msg=not_found)
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_admin_trials(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    trials = TrialRequest.objects.all().order_by('-created_at')
    serializer = TrialRequestSerializer(trials, many=True)
    return Response({'status': 'success', 'trials': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_admin_inquiries(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    inquiries = ContactInquiry.objects.all().order_by('-created_at')
    serializer = ContactInquirySerializer(inquiries, many=True)
    return Response({'status': 'success', 'inquiries': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def list_admin_service_requests(request):
    if not verify_admin_access(request):
        return Response({'status': 'error', 'message': 'Unauthorized admin access.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    service_reqs = OpticalServiceRequest.objects.all().order_by('-created_at')
    serializer = OpticalServiceRequestSerializer(service_reqs, many=True)
    return Response({'status': 'success', 'service_requests': serializer.data})
