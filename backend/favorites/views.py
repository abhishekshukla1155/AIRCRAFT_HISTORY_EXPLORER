from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Favorite
from .serializers import FavoriteSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        aircraft = serializer.validated_data.get('aircraft')
        if Favorite.objects.filter(user=request.user, aircraft=aircraft).exists():
            raise ValidationError({"error": "This aircraft is already in your favorites."})
            
        serializer.save(user=request.user)
        return Response({"message": "Added to favorites"}, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Removed from favorites"}, status=status.HTTP_200_OK)
