from django.contrib import admin
from .models import Client,Utilisateur
from django.contrib.auth.admin import UserAdmin


# Register your models here.


@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Informations supplémentaires", {
            "fields": ("age", "adresse", "telephone1", "telephone2", "role", "annee_experience")
        }),
    )

admin.site.register(Client)
