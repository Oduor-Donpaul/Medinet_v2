# Generated by Django 5.0.6 on 2024-07-09 11:05

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Disease',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('risk_score', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('medical_history', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HealthRiskAssessement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('risk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medinet.disease')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medinet.patient')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Practitioner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('speciality', models.CharField(max_length=100)),
                ('experience', models.IntegerField(default=0)),
                ('start_availability', models.DateTimeField()),
                ('end_availability', models.DateTimeField(default=django.utils.timezone.now)),
                ('image', models.ImageField(upload_to='')),
                ('description', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.CharField(max_length=20)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('appointment_date', models.DateField()),
                ('time', models.DateTimeField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled'), ('completed', 'Completed')], default='pending', max_length=20)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to=settings.AUTH_USER_MODEL)),
                ('practitioner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medinet.practitioner')),
            ],
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('description', models.TextField()),
                ('Practitioner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='medinet.practitioner')),
            ],
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('rating', models.IntegerField()),
                ('services', models.ManyToManyField(to='medinet.services')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]