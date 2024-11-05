from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        normalized_email = self.normalize_email(email=email)
        user = self.model(email=normalized_email, **extra_fields)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """Crea un superusuario con los permisos adecuados."""
        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        super_user = self.create_user(email, password, **extra_fields)

        return super_user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    dni = models.IntegerField(unique=True)  # DNI como clave primaria
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    email = models.EmailField(max_length=255, unique=True)  # Cambiado a EmailField
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/profile_default.jpg') 
    password = models.CharField(max_length=255)  # Agregado el campo de contraseña
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # Agregado el campo de superusuario

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'dni']  # Agregado dni como campo requerido

    objects = UserManager()

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.get_full_name()
