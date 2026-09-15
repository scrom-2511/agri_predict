from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignupSerializer, SigninSerializer


class SignupView(APIView):

    def post(self, request):
        print(request.data)
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "User created successfully",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class SigninView(APIView):

    def post(self, request):
        print(request.data)
        serializer = SigninSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            login(request, user)

            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            })

        return Response(
            serializer.errors,
            status=status.HTTP_401_UNAUTHORIZED,
        )


class SignoutView(APIView):

    def post(self, request):
        logout(request)

        return Response({
            "message": "Logout successful"
        })