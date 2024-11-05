from django.contrib import admin
from .models import UserAccount

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'email', 'is_active', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')

admin.site.register(UserAccount, UserAccountAdmin)