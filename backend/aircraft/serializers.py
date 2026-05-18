from rest_framework import serializers
from .models import Aircraft, Era

class EraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Era
        fields = '__all__'

class AircraftSerializer(serializers.ModelSerializer):
    eras = EraSerializer(many=True, read_only=True)
    era_ids = serializers.PrimaryKeyRelatedField(
        queryset=Era.objects.all(), many=True, write_only=True, source='eras'
    )

    class Meta:
        model = Aircraft
        fields = '__all__'
