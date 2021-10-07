# Generated by Django 3.2.7 on 2021-10-07 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spec', models.CharField(max_length=100)),
                ('mean', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Fishing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('pointName', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
                ('category', models.IntegerField()),
                ('longitude', models.CharField(max_length=100)),
                ('latitude', models.CharField(max_length=100)),
                ('dpwt', models.CharField(max_length=100)),
                ('material', models.CharField(max_length=500)),
                ('fishingImg', models.CharField(max_length=500)),
                ('obsCode', models.CharField(max_length=500)),
                ('obsPostId', models.CharField(max_length=500)),
                ('caution', models.CharField(max_length=500)),
                ('locInfo', models.CharField(max_length=500)),
                ('nearPointName', models.CharField(max_length=500)),
                ('fish', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviewContent', models.CharField(max_length=1000, null=True)),
                ('rating', models.IntegerField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Scrap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fishing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fishing.fishing')),
            ],
            options={
                'db_table': 'scrap',
            },
        ),
    ]
