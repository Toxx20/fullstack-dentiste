from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView,CreateAPIView,RetrieveUpdateDestroyAPIView
from .models import Client,Utilisateur
from .serilaizers import ClientSerializers,CustomTokenSerializer,UtilisateurSerializer,RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions


class ClientListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializers

class UtilisateurListView(ListAPIView):
    queryset = Utilisateur.objects.filter(role='Cl')  # seulement les clients
    serializer_class = UtilisateurSerializer

class ClientCreateView(CreateAPIView):
    queryset= Client.objects.all()
    serializer_class = ClientSerializers

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "nom": user.first_name,
            "prenom": user.last_name,
            "email": user.email,
            "username": user.username,
            "age": user.age,
            "adresse": user.adresse,
            "telephone1": user.telephone1,
            "telephone2": user.telephone2,
            "role": user.role,
            "annee_experience": user.annee_experience,
        })

class ClientDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializers


class RegisterView(generics.CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny] 