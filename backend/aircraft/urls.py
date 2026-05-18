from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AircraftViewSet, EraViewSet

router = DefaultRouter()
router.register(r'eras', EraViewSet)
router.register(r'', AircraftViewSet) # Base endpoint /api/aircraft/

urlpatterns = [
    path('', include(router.urls)),
]
