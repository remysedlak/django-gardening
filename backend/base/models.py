from django.db import models
from django.utils import timezone
from datetime import timedelta

class Plant(models.Model):
    SPECIES_CHOICES = [
        ('succulent', 'Succulent'),
        ('fern', 'Fern'),
        ('flower', 'Flower'),
        ('tree', 'Tree'),
        ('herb', 'Herb'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, help_text="Name you gave this plant")
    species = models.CharField(max_length=50, choices=SPECIES_CHOICES, default='other')
    scientific_name = models.CharField(max_length=100, blank=True, null=True)
    acquired_date = models.DateField(default=timezone.now)
    location = models.CharField(max_length=100, blank=True, help_text="e.g., Living room, Balcony")

    watering_interval_days = models.PositiveIntegerField(help_text="How often this plant needs water (in days)")
    last_watered = models.DateField(default=timezone.now, blank=True)

    def needs_watering(self):
        from datetime import date, timedelta
        next_water = self.last_watered + timedelta(days=self.watering_interval_days)
        return date.today() >= next_water
    
    def next_watering_date(self):
        return self.last_watered + timedelta(days=self.watering_interval_days)
    
    def mark_watered(self):
        self.last_watered = timezone.now().date()
        self.save()

    def __str__(self):
        return f"{self.name} ({self.species})"

    class Meta:
        ordering = ['name']
        verbose_name = 'Plant'
        verbose_name_plural = 'Plants'

class PlantImage(models.Model):
    plant = models.ForeignKey(Plant, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(default='fallback.png', blank=True, upload_to='images/')
    description = models.CharField(max_length=255, blank=True, help_text="Description of the image")
    date_added = models.DateField(default=timezone.now)

    def __str__(self):
        return f"Image of {self.plant.name}" if self.plant else "Unlinked Image"
    
class Note(models.Model):
    plant = models.ForeignKey(Plant, related_name='notes', on_delete=models.CASCADE)
    content = models.TextField()
    date_added = models.DateField(default=timezone.now)

    def __str__(self):
        return f"Note for {self.plant.name} on {self.date_added}" if self.plant else "Unlinked Note"