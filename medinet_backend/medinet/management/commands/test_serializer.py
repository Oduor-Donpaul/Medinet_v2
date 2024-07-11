import logging
from django.core.management.base import BaseCommand
from medinet.serializers import AppointmentSerializer

class Command(BaseCommand):
    help = 'Test AppointmentSerializer with different inputs'

    def handle(self, *args, **kwargs):
        # Set up logging
        logging.basicConfig(level=logging.DEBUG)

        # Define test cases
        test_cases = [
            {
                'appointment_date': '2024-07-05',
                'time': '02:02 PM',
                'patient': 'donpaul',
                'practitioner': 'user1',
                'service': 'serv1',
                'status': 'pending'
            },
            {
                'appointment_date': '2024-07-05',
                'time': '14:02',
                'patient': 'donpaul',
                'practitioner': 'user1',
                'service': 'serv1',
                'status': 'pending'
            }
        ]

        # Test each case
        for case in test_cases:
            self.stdout.write(f"\nTesting with input: {case}")
            serializer = AppointmentSerializer(data=case)
            if serializer.is_valid():
                self.stdout.write(f"Validated data: {serializer.validated_data}")
            else:
                self.stdout.write(f"Errors: {serializer.errors}")