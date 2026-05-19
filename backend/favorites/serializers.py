from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    aircraft_name = serializers.CharField(source='aircraft.name', read_only=True)
    manufacturer = serializers.CharField(source='aircraft.manufacturer', read_only=True)
    country = serializers.CharField(source='aircraft.country', read_only=True)
    generation = serializers.CharField(source='aircraft.generation', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'aircraft', 'aircraft_name', 'manufacturer', 'country', 'generation', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        aircraft = validated_data['aircraft']
        
        if Favorite.objects.filter(user=user, aircraft=aircraft).exists():
            raise serializers.ValidationError("Aircraft is already in favorites")
            
        return Favorite.objects.create(user=user, **validated_data)
