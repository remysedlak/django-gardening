from rest_framework import serializers
from base.models import Plant, PlantImage, Note

class PlantSerializer(serializers.ModelSerializer):
    
    needs_watering = serializers.SerializerMethodField()

    class Meta:
        model = Plant
        fields = [f.name for f in Plant._meta.fields] + ['needs_watering']

    def get_needs_watering(self, obj):
        return obj.needs_watering()
        

class PlantImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantImage
        fields = ['description', 'image', 'plant', 'date_added', 'id']



class PlantWithLatestImageSerializer(serializers.ModelSerializer):
    latest_image = serializers.SerializerMethodField()

    class Meta:
        model = Plant
        fields = ['id', 'name', 'species', 'scientific_name', 'acquired_date',
                  'location', 'watering_interval_days', 'last_watered', 'latest_image']

    def get_latest_image(self, obj):
        image = obj.images.order_by('-date_added').first()
        if image:
            return {
                'id': image.id,
                'image': image.image.url,
                'description': image.description,
                'date_added': image.date_added
            }
        return None
    
class PlantNeedsWateringSerializer(serializers.ModelSerializer):
    needs_watering = serializers.SerializerMethodField()
    next_watering_date = serializers.SerializerMethodField()

    class Meta:
        model = Plant
        fields = ['id', 'name', 'species', 'location', 'last_watered', 'watering_interval_days', 'needs_watering', 'next_watering_date']

    def get_needs_watering(self, obj):
        return obj.needs_watering()

    def get_next_watering_date(self, obj):
        from datetime import timedelta
        return obj.last_watered + timedelta(days=obj.watering_interval_days)
    
class NoteSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='plant.name', read_only=True)
    class Meta:
        model = Note
        fields = ['id', 'plant', 'name', 'content', 'date_added']

