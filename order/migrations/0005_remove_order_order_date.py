# Generated by Django 5.0.6 on 2024-11-03 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_order_delivery_date_order_shipping_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='order_date',
        ),
    ]
