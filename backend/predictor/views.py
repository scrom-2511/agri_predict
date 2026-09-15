from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FertilizerInputSerializer
from .ml_service import predict_fertilizer

class FertilizerPredictionView(APIView):
    def post(self, request):
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        print("i was hit")
        serializer = FertilizerInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            result = predict_fertilizer(serializer.validated_data)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"fertilizer": result}, status=status.HTTP_200_OK)