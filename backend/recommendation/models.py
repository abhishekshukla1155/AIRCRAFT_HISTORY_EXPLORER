from django.db import models
from django.contrib.auth import get_user_model
from aircraft.models import Aircraft

User = get_user_model()

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'aircraft')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.aircraft.name}"


class Recommendation(models.Model):
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='recommendations')
    recommended_aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='recommended_for')
    reason = models.CharField(max_length=255, blank=True, help_text="Why was this recommended?")
    score = models.FloatField(default=0.0, help_text="Similarity or recommendation score")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('aircraft', 'recommended_aircraft')
        ordering = ['-score']

    def __str__(self):
        return f"{self.aircraft.name} -> {self.recommended_aircraft.name}"
