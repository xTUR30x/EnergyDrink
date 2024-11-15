# Generated by Django 5.0.6 on 2024-11-03 15:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('beverage', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('order_date', models.DateField()),
                ('state', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('order_item_id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('beverage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='beverage.beverage')),
            ],
        ),
    ]
