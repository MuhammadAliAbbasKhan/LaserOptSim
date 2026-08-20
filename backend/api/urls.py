from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SoftwareProductViewSet, 
    submit_trial_request, 
    submit_contact_inquiry,
    submit_service_request,
    signup_user,
    login_user,
    process_subscription,
    create_stripe_payment_intent,
    stripe_webhook,
    get_admin_analytics,
    list_admin_users,
    update_user_plan,
    list_admin_trials,
    list_admin_inquiries,
    list_admin_service_requests,
    get_mongodb_status
)

router = DefaultRouter()
router.register(r'products', SoftwareProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('mongodb-status/', get_mongodb_status, name='mongodb_status'),
    path('trial-request/', submit_trial_request, name='submit_trial_request'),
    path('contact/', submit_contact_inquiry, name='submit_contact_inquiry'),
    path('service-request/', submit_service_request, name='submit_service_request'),
    path('auth/signup/', signup_user, name='signup_user'),
    path('auth/login/', login_user, name='login_user'),
    path('subscribe/', process_subscription, name='process_subscription'),
    path('stripe/create-payment-intent/', create_stripe_payment_intent, name='create_stripe_payment_intent'),
    path('stripe/webhook/', stripe_webhook, name='stripe_webhook'),
    
    # Admin Panel API Routes
    path('admin/analytics/', get_admin_analytics, name='admin_analytics'),
    path('admin/users/', list_admin_users, name='admin_users'),
    path('admin/users/update-plan/', update_user_plan, name='admin_update_user_plan'),
    path('admin/trials/', list_admin_trials, name='admin_trials'),
    path('admin/inquiries/', list_admin_inquiries, name='admin_inquiries'),
    path('admin/service-requests/', list_admin_service_requests, name='admin_service_requests'),
]
