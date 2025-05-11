from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Plant, PlantImage, Note
from .serializers import PlantSerializer, PlantImageSerializer, PlantWithLatestImageSerializer, PlantNeedsWateringSerializer, NoteSerializer

@api_view(['GET'])
def get_photos(request):
    # Simulate some data fetching logic
    plants = PlantImage.objects.all()
    serializer = PlantImageSerializer(plants, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_plants(request):
    plants = Plant.objects.prefetch_related('images').all()  # Preload images to avoid N+1 query issue
    serializer = PlantWithLatestImageSerializer(plants, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_notes(request):
    notes = Note.objects.all()  
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def plants_needing_water(request):

    # Filter at Python level (not ideal at scale — but works fine for now)
    plants = Plant.objects.all()
    needs_water = [plant for plant in plants if plant.needs_watering()]
    serializer = PlantNeedsWateringSerializer(needs_water, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_plant_notes(request, plant_id):
    notes = Note.objects.filter(plant__id=plant_id).order_by('-date_added')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------

@api_view(['POST'])
def upload_plant(request):
    serializer = PlantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def upload_photo(request):
    serializer = PlantImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def upload_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
