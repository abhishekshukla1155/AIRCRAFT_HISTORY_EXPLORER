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

    image = serializers.SerializerMethodField()

    class Meta:
        model = Aircraft
        fields = '__all__'

    def get_image(self,obj):
        request = self.context.get("request")

        if obj.image:
            return request.build_absolute_uri(
                obj.image.url
            )

        return None
