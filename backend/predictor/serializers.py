from rest_framework import serializers

SOIL_CHOICES = ["Clayey", "Loamy", "Red", "Black", "Sandy"]
CROP_CHOICES = [
    "rice", "Wheat", "Tobacco", "Sugarcane", "Pulses", "pomegranate", "Paddy",
    "Oil seeds", "Millets", "Maize", "Ground Nuts", "Cotton", "coffee",
    "watermelon", "Barley", "kidneybeans", "orange",
]

class FertilizerInputSerializer(serializers.Serializer):
    temperature = serializers.FloatField()
    humidity = serializers.FloatField()
    moisture = serializers.FloatField()
    soil_type = serializers.ChoiceField(choices=SOIL_CHOICES)
    crop_type = serializers.ChoiceField(choices=CROP_CHOICES)
    nitrogen = serializers.FloatField()
    potassium = serializers.FloatField()
    phosphorous = serializers.FloatField()