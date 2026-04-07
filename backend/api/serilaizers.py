from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Client,Utilisateur



class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'email']

class ClientSerializers (serializers.ModelSerializer):
    nom = UtilisateurSerializer(read_only=True)
    nom_id = serializers.PrimaryKeyRelatedField(    
        queryset=Utilisateur.objects.all(),
        source='nom',
        write_only=True
    )
    class Meta:
        model= Client
        fields = '__all__'

class CustomTokenSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajouter les infos dans le token
        token['email'] = user.email
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Ajouter dans la réponse API
        data['user'] = {
            "email": self.user.email,
            "username": self.user.username,
            "role": self.user.role
        }

        return data