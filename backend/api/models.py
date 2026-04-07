from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser

UtilisateurType= [
    ('Ad' , 'Admin'),
    ('Do','Docteur'),
    ('Cl','Client')
]

class Utilisateur(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)

    #les champs supplémentaires:
    age = models.PositiveIntegerField(null=False,default=1)
    adresse = models.CharField(max_length=40,blank=True)

    telephone1 = models.CharField( blank= False,
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message="Le numéro de téléphone doit contenir exactement 10 chiffres."
            )
        ]
    )

    telephone2 = models.CharField( blank= True,
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message="Le numéro de téléphone doit contenir exactement 10 chiffres."
            )
        ]
    )

    role = models.CharField(choices=UtilisateurType,default='Cl')


    #champ spécifique si c'est du type Docteur
    annee_experience=models.PositiveIntegerField(null=True,blank=True)

    def save(self, *args, **kwargs):
        # Gestion automatique des droits
        if self.is_superuser:
            self.is_staff = True
            self.is_superuser = True
        else:
            if self.role == 'Ad':
                self.is_staff = True
                self.is_superuser = True
            else:
                self.is_staff = False
                self.is_superuser = False

        # Si ce n’est pas un docteur → pas d’expérience
        if self.role != 'Do':
            self.annee_experience = None

        super().save(*args, **kwargs)


TYPE =[
    ('A','Appareil'),
    ('AU','Autre'),
    ('B','Blanchir'),
    ('S','Soin')
    ]


# Create your models here.
class Client(models.Model):
    nom= models.ForeignKey('Utilisateur', on_delete=models.SET_NULL, null=True)
    type= models.CharField( choices=TYPE,default='S')
    date=models.DateTimeField(blank=False)
    description = models.TextField(default='')

