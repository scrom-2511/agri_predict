# predictor/urls.py
from django.urls import path
from .views import FertilizerPredictionView

urlpatterns = [
    path("predict/", FertilizerPredictionView.as_view(), name="predict-fertilizer"),
]