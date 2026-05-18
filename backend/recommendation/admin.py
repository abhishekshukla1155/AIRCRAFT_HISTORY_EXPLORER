from django.contrib import admin
from .models import Favorite, Recommendation

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'aircraft', 'created_at')
    search_fields = ('user__username', 'aircraft__name')

@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('aircraft', 'recommended_aircraft', 'score')
    search_fields = ('aircraft__name', 'recommended_aircraft__name')
