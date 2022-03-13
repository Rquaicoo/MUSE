from django.shortcuts import redirect, render

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
            return redirect('downloadApp')
        return render(request, 'betasignup.html')
    elif BetaUsers.objects.count() == 15:
        return render(request, 'full.html')
    else:
        context = {'numberleft': 15 - BetaUsers.objects.count()}
        return render(request, 'betasignup.html', context)

def users(request):
    if request.user.is_authenticated:
        users = BetaUsers.objects.all()
        return render(request, 'users.html', {'users': users})
def downloadApp(request):
    return render(request, 'downloadapp.html')