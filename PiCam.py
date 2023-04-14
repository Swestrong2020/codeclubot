from picamera2 import Picamera2, Preview
import time
import os



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


print("Give a data using the folowing format: Mon Apr 17")
SetDate = input().lower


while LocalTime != SetDate:

    #sets dir name to the current hour
    directory = time.strftime("%H")
    # checks if dir with time name exsit
    if os.path.exists(os.path.dirname(os.path.realpath(__file__))+"/"+int(time.strftime("%H"))):
        path = os.path.join(parentDir, directory)
        #makes dir
        os.makedirs(path)
        Camera.capture_file(path+((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")
    else:
        path = os.path.join(parentDir, directory)
        Camera.capture_file(path+((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")

    LocalTime = (time.strftime("%a %b %d")).lower()

    time.sleep(60)

    