from rest_framework import serializers
from .models import Favorite, Recommendation
from aircraft.serializers import AircraftSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    aircraft_details = AircraftSerializer(source='aircraft', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'aircraft', 'aircraft_details', 'created_at']
        read_only_fields = ['user']

class RecommendationSerializer(serializers.ModelSerializer):
    recommended_aircraft_details = AircraftSerializer(source='recommended_aircraft', read_only=True)

    class Meta:
        model = Recommendation
        fields = ['id', 'aircraft', 'recommended_aircraft', 'recommended_aircraft_details', 'reason', 'score', 'created_at']
