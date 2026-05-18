from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
import django_filters

from .models import Aircraft, Era
from .serializers import AircraftSerializer, EraSerializer

class AircraftFilter(django_filters.FilterSet):
    era = django_filters.CharFilter(field_name='eras__title', lookup_expr='icontains')
    country = django_filters.CharFilter(field_name='country', lookup_expr='icontains')
    generation = django_filters.CharFilter(field_name='generation', lookup_expr='icontains')
    role = django_filters.CharFilter(field_name='role', lookup_expr='icontains')

    class Meta:
        model = Aircraft
        fields = ['country', 'generation', 'role', 'era']

class EraViewSet(viewsets.ModelViewSet):
    queryset = Era.objects.all().order_by('start_year')
    serializer_class = EraSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AircraftViewSet(viewsets.ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = AircraftFilter
    search_fields = ['name', 'manufacturer', 'country']

class CompareAircraftView(views.APIView):
    """
    Endpoint to compare two aircraft.
    Example: /api/compare/?ids=1,2
    """
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        ids = request.query_params.get('ids', '')
        if not ids:
            raise ValidationError({"error": "ids parameter is required. Example: ?ids=1,2"})
        
        id_list = [i.strip() for i in ids.split(',')]
        if len(id_list) != 2:
            raise ValidationError({"error": "Please provide exactly two IDs to compare. Example: ?ids=1,2"})
            
        try:
            aircraft1 = Aircraft.objects.get(id=id_list[0])
            aircraft2 = Aircraft.objects.get(id=id_list[1])
        except Aircraft.DoesNotExist:
            raise ValidationError({"error": "One or both Aircraft IDs are invalid."})
        except ValueError:
            raise ValidationError({"error": "Invalid ID format."})
            
        a1_data = {
            "name": aircraft1.name,
            "speed": aircraft1.speed,
            "range": aircraft1.range,
            "generation": aircraft1.generation,
        }
        
        a2_data = {
            "name": aircraft2.name,
            "speed": aircraft2.speed,
            "range": aircraft2.range,
            "generation": aircraft2.generation,
        }
        
        comparison = {
            "same_generation": aircraft1.generation == aircraft2.generation if (aircraft1.generation and aircraft2.generation) else False,
            "speed_difference": f"{aircraft1.speed} vs {aircraft2.speed}",
            "range_difference": f"{aircraft1.range} vs {aircraft2.range}",
        }
        
        return Response({
            "Aircraft1": a1_data,
            "Aircraft2": a2_data,
            "comparison": comparison
        })
