from django.urls import path
from .views import CompareAircraftView

urlpatterns = [
    path('', CompareAircraftView.as_view(), name='compare_aircraft'),
]
