from django.db import models
from django.contrib.auth import get_user_model
from aircraft.models import Aircraft

User = get_user_model()

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_favorites')
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='favorited_in')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'aircraft'], name='unique_user_aircraft_favorite')
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.aircraft.name}"
