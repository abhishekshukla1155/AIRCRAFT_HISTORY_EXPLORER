from django.contrib import admin
from .models import Aircraft, Era

@admin.register(Aircraft)
class AircraftAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'generation', 'role')
    search_fields = ('name', 'manufacturer', 'country', 'role')
    list_filter = ('generation', 'country', 'role')

@admin.register(Era)
class EraAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_year', 'end_year')
    search_fields = ('title',)
