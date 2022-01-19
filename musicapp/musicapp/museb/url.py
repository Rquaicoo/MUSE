from django.urls import path, re_path

from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserView, LogoutUserAPIView, FacebookLogin, GoogleLogin

urlpatterns = [
    re_path(r'^auth/login/$', obtain_auth_token, name="auth_user_login"),
    re_path(r'^auth/register/$', CreateUserView.as_view(), name="auth_user_register"),
    re_path(r'^auth/logout/$', LogoutUserAPIView.as_view(), name="auth_user_logout"),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')

]