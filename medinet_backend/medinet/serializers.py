from .models import Practitioner, Patient, Appointment, Hospital, Disease, HealthRiskAssessement, Services
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils.dateparse import parse_time
from datetime import datetime

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


class ModifiedTimeField(serializers.TimeField):
    def to_internal_value(self, value):
        if isinstance(value, str):
            print(f"Received time value: {value}")
            try:
                # Attempt to parse time from provided "hh:mm am/pm" format
                parsed_time = datetime.strptime(value, "%I:%M %p").time()
                print(f"Parsed time (12-hour format): {parsed_time}")
                return parsed_time
            except ValueError:
                print(f"Failed to parse '{value}' as 12-hour time")
                try:
                    # Attempt to parse time from provided "HH:mm" format
                    parsed_time = datetime.strptime(value, "%H:%M").time()
                    print(f"Parsed time (24-hour format): {parsed_time}")
                    return parsed_time
                except ValueError:
                    print(f"Failed to parse '{value}' as 24-hour time")
                    raise serializers.ValidationError("Time must be in the format 'hh:mm am/pm' or 'HH:mm'.")
        return super().to_internal_value(value)

class AppointmentSerializer(serializers.ModelSerializer):

    patient = serializers.CharField() #expecxt a username
    practitioner = serializers.CharField() # expect a username instread of id
    #time = ModifiedTimeField()
    appointment_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"])
    time = ModifiedTimeField(format="%H:%M:%S")

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        #Retrieve patient by username
        patient_username = validated_data.pop('patient')

        try:
            patient = User.objects.get(username=patient_username)
        except User.DoesNotExist:
            raise serializers.ValidationError({"patient": "Patient not found"})

        # Retrieve practitioner by username
        practitioner_name = validated_data.pop('practitioner')

        try:
            practitioner = Practitioner.objects.get(user__username=practitioner_name)
        except Practitioner.DoesNotExist:
            raise serializers.ValidationError({"practitioner": "Practitioner not found"})

        print(f"validated time before creation: {validated_data}")

        appointment = Appointment.objects.create(
            patient=patient,
            practitioner=practitioner,
            **validated_data
            )
        return appointment

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
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
