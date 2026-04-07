from django.urls import path
from .views import ClientListView,ClientCreateView,CustomTokenView,MeView,UtilisateurListView,ClientDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('clients/', ClientListView.as_view(), name='client-list'),
    path('create/', ClientCreateView.as_view(), name='client-create'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', CustomTokenView.as_view(), name='login'),
    path('utilisateurs/', UtilisateurListView.as_view()),
    path('me/', MeView.as_view()),
    path("clients/<int:pk>/", ClientDetailView.as_view(), name="client-detail")
]