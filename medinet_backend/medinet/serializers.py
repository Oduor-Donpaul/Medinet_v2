from .models import Practitioner, Patient, Appointment, Hospital, Disease, HealthRiskAssessement, Services
from rest_framework import serializers
from django.contrib.auth.models import User

class PractitionerSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)

    class Meta:
        model = Practitioner
        fields = fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status', 'patient', 'practitioner', 'service', 'time', 'date']

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = '__all__'

class HealthRiskAssessementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRiskAssessement
        fields = '__all__'

class ServicesSerializer(serializers.ModelSerializer):

    Practitioner = PractitionerSerializer()

    class Meta:
        model = Services
        fields = '__all__'

    def get_practitioner_name(self, obj):
        return obj.practitioner.first_name
    

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
