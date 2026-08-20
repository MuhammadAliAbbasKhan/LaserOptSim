from django.db import models

class SoftwareProduct(models.Model):
    name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    category = models.CharField(max_length=100, default='Laser Optics Simulation')
    version = models.CharField(max_length=20, default='2026.1')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TrialRequest(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    company = models.CharField(max_length=255)
    software_choice = models.CharField(max_length=255, default='LaserOptSimDESIGNER')
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.company}) - {self.software_choice}"

class ContactInquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} - {self.subject}"

class UserSubscription(models.Model):
    TIER_CHOICES = [
        ('free', 'Regular Free User (Trial)'),
        ('basic', 'Basic Tier ($99/mo)'),
        ('standard', 'Standard Tier ($299/mo)'),
        ('premium', 'Premium Tier ($599/mo)'),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    plan_tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='free')
    billing_cycle = models.CharField(max_length=20, default='monthly')
    is_active = models.BooleanField(default=True)
    payment_reference = models.CharField(max_length=100, blank=True, null=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    stripe_payment_intent_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.email}) - {self.plan_tier}"

class OpticalServiceRequest(models.Model):
    SERVICE_CHOICES = [
        ('laser_propagation', 'Physical Optics Laser Propagation (ABCD & M²)'),
        ('fiber_coupling', 'Fiber Coupling Efficiency Optimization'),
        ('laser_resonator', 'Laser Resonator Stability & Mode Design'),
        ('thermal_lensing', 'Thermal Lensing & Crystal Gradient Analysis'),
        ('micro_optics', 'Micro-Optics & Beam Shaping Refractive Design'),
        ('stray_light', 'Stray Light & High-Power Laser Safety Analysis'),
        ('cad_conversion', 'CAD Import & Conversion (SolidWorks/Creo/STEP)'),
    ]

    INDUSTRY_CHOICES = [
        ('laser_mfg', 'Laser Manufacturing & Photonics'),
        ('semiconductor', 'Semiconductor Lithography & Inspection'),
        ('automotive', 'Automotive LIDAR & Material Processing'),
        ('medical_laser', 'Medical Lasers & Surgery Devices'),
        ('aerospace', 'Aerospace & Quantum Optics'),
        ('research', 'University & National Lab Research'),
    ]

    user_email = models.EmailField()
    user_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    plan_tier = models.CharField(max_length=50, default='standard')
    project_title = models.CharField(max_length=255)
    service_type = models.CharField(max_length=100, choices=SERVICE_CHOICES, default='laser_propagation')
    industry = models.CharField(max_length=100, choices=INDUSTRY_CHOICES, default='laser_mfg')
    wavelength_range = models.CharField(max_length=100, default='NIR (1064 nm)')
    analysis_tools = models.TextField(blank=True, null=True)
    system_specifications = models.TextField()
    cad_file_attached = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50, default='Pending Analysis')
    admin_notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.status}] {self.project_title} - {self.user_email}"
