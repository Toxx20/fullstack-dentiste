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


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    annee_experience = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Utilisateur
        fields = [
            'username',
            'email', 
            'password',
            'age',
            'adresse',
            'telephone1',
            'telephone2',
            'role',
            'annee_experience'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Utilisateur(**validated_data)
        user.set_password(password)  #hash le mot de passe
        user.save()
        return user