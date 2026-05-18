from django.db import models

class Era(models.Model):
    title = models.CharField(max_length=100)
    start_year = models.IntegerField()
    end_year = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Aircraft(models.Model):
    name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    first_flight = models.DateField(null=True, blank=True)
    speed = models.CharField(max_length=100, blank=True, help_text="Top speed, e.g., Mach 2.0 or 1,500 mph")
    range = models.CharField(max_length=100, blank=True, help_text="Operational range, e.g., 2,000 miles")
    crew = models.IntegerField(default=1)
    role = models.CharField(max_length=100)
    weapons = models.TextField(blank=True)
    engine_type = models.CharField(max_length=100, blank=True)
    generation = models.CharField(max_length=50, blank=True)
    war_usage = models.TextField(blank=True)
    description = models.TextField()
    
    # Era relationship
    eras = models.ManyToManyField(Era, related_name='aircraft', blank=True)

    image = models.ImageField(upload_to='aircraft_images/', null=True, blank=True)
    model_file = models.FileField(upload_to='aircraft_models/', null=True, blank=True, help_text="3D model file (e.g. .gltf, .obj)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Aircraft"

    def __str__(self):
        return self.name
