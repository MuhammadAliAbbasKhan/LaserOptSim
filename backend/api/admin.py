from django.contrib import admin
from .models import SoftwareProduct, TrialRequest, ContactInquiry, UserSubscription, OpticalServiceRequest

@admin.register(SoftwareProduct)
class SoftwareProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'code_name', 'category', 'version', 'created_at')
    search_fields = ('name', 'code_name')

@admin.register(TrialRequest)
class TrialRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'company', 'software_choice', 'created_at')
    search_fields = ('full_name', 'email', 'company')

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')

@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'plan_tier', 'billing_cycle', 'is_active', 'created_at')
    list_filter = ('plan_tier', 'is_active', 'billing_cycle')
    search_fields = ('username', 'email')

@admin.register(OpticalServiceRequest)
class OpticalServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('project_title', 'user_email', 'service_type', 'status', 'created_at')
    list_filter = ('service_type', 'status', 'industry')
    search_fields = ('project_title', 'user_email')
