from django.contrib import admin
from django.apps import apps
from django.contrib.auth.models import Group, User


# Register your models here.

models = apps.get_models()

#register all models dynamically
for model in models:
     if model != User and model != Group:
        admin.site.register(model)