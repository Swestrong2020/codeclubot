from picamera2 import Picamera2, Preview
import time
import os

ImgTime = 600 #time between photos in seconds

#starts camera
Camera = Picamera2()
CameraConfig = Camera.create_preview_configuration()
Camera.configure(CameraConfig)
Camera.start_preview(Preview.QTGL)
Camera.start()


StartTime = int(time.strftime("%H"))
directory = StartTime 
parentDir = os.path.dirname(os.path.realpath(__file__))
LocalTime = (time.strftime("%a %b %d")).lower()

time.wait(2)

#askeds for input
print("Give a data using the folowing format: Mon Apr 17")
SetDate = input().lower

while LocalTime != SetDate:

    #sets dir name to the current hour
    directory = time.strftime("%H")
    # checks if dir with time name exsit
    if os.path.exists(os.path.dirname(os.path.realpath(__file__))+"/"+int(time.strftime("%H"))):
        #locats dir
        path = os.path.join(parentDir, directory)
        #makes dir
        os.makedirs(path)
        #takes phote
        Camera.capture_file(path+((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")

    else:
        #locats dir
        path = os.path.join(parentDir, directory)
        #takes phote
        Camera.capture_file(path+((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")


    # set localtime to the curren time
    LocalTime = (time.strftime("%a %b %d")).lower()
    # waits set amount of time
    time.sleep(ImgTime)

    