from asyncore import read
from django.contrib.auth import get_user_model
from rest_framework import serializers

class CreateUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only = True, required=True,
    style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('name', 'email', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined', 'last_login')

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
