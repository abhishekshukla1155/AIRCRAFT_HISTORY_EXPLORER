from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    aircraft_name = serializers.CharField(source='aircraft.name', read_only=True)
    country = serializers.CharField(source='aircraft.country', read_only=True)
    generation = serializers.CharField(source='aircraft.generation', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'aircraft', 'aircraft_name', 'country', 'generation', 'created_at']
        read_only_fields = ['user']
