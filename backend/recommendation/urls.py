from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavoriteViewSet, RecommendationViewSet

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'', RecommendationViewSet, basename='recommendation') # Base endpoint /api/recommendation/

urlpatterns = [
    path('', include(router.urls)),
]
