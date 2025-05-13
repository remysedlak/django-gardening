from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Login
    TokenRefreshView,     # Refresh
    TokenVerifyView       # Optional: verify token validity
)

urlpatterns = [
    path('plants', views.get_plants),
    path('photos', views.get_photos),
    path('upload_plant/', views.upload_plant),
    path('upload_photo/', views.upload_photo),
    path('needs_watering/', views.plants_needing_water),
    path('plants_needing_water/', views.plants_needing_water),
    path('notes/', views.get_notes),
    path('upload_note/', views.upload_note),
    path('plants/<int:plant_id>/notes/', views.get_plant_notes),
    path('register/', views.RegisterView.as_view(), name='register'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),     # optional
]