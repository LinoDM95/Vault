# Generated by Django 4.2.19 on 2025-03-06 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_vault', '0003_snippet_is_public_snippet_saved_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snippet',
            name='is_public',
            field=models.BooleanField(default=False),
        ),
    ]
