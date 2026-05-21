from rest_framework import generics
from rest_framework.permissions import AllowAny
from aircraft.models import Aircraft
from .serializers import TimelineAircraftSerializer

class TimelineListView(generics.ListAPIView):
    queryset = Aircraft.objects.exclude(first_flight__isnull=True).order_by('first_flight')
    serializer_class = TimelineAircraftSerializer
    permission_classes = [AllowAny]
