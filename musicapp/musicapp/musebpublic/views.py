from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
#httpresponse
from django.http import HttpResponse
from .models import *
import datetime
# Create your views here.

def signUp(request):
    users = BetaUsers.objects.all()
    existing_mails = []
    for users in users: 
        existing_mails.append(users.email)
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        
        if email in existing_mails:
            return HttpResponse("You have already signed up")
        else:
            BetaUsers.objects.create(name=name,
            email=email,
            timestamp = datetime.datetime.today()
            )
        return render(request, 'betasignup.html')
    elif BetaUsers.objects.count() == 10:
        return render(request, 'full.html')
    else:
        context = {'numberleft': 10 - BetaUsers.objects.count()}
        return render(request, 'betasignup.html', context)

def users(request):
    if request.user.is_authenticated:
        users = BetaUsers.objects.all()
        return render(request, 'users.html', {'users': users})


