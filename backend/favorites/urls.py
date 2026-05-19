from django.urls import path
from .views import FavoriteListCreateView, FavoriteDeleteView

urlpatterns = [
    path('', FavoriteListCreateView.as_view()),
    path('<int:id>/', FavoriteDeleteView.as_view()),
]
