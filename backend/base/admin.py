from django.contrib import admin
from .models import Plant, PlantImage, Note

# Register your models here.
admin.site.register(Plant)
admin.site.register(PlantImage)
admin.site.register(Note)
