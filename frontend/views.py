from django.shortcuts import render

def index(request):
    return render(request, "index.html" )

def getroom(request, roomCode):
   return render(request, "index.html"  )
