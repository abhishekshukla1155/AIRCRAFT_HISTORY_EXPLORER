from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Favorite, Recommendation
from .serializers import FavoriteSerializer, RecommendationSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        from rest_framework.exceptions import ValidationError
        aircraft = serializer.validated_data.get('aircraft')
        if Favorite.objects.filter(user=self.request.user, aircraft=aircraft).exists():
            raise ValidationError({"error": "This aircraft is already in your favorites."})
        serializer.save(user=self.request.user)


class RecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    # In a real app, you might filter by aircraft or user profile.
