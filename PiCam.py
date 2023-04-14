from picamera2 import Picamera2, Preview
import time
import os

parentDir = os.path.dirname(os.path.realpath(__file__))
Camera = Picamera2()
CameraConfig = Camera.create_preview_configuration()
Camera.configure(CameraConfig)
Camera.start_preview(Preview.QTGL)
Camera.start()
LocalTime = time.asctime
StartTime = int(time.strftime("%H"))
directory = StartTime 
parentDir = os.path.dirname(os.path.realpath(__file__))

time.wait(2)


while LocalTime != "Mon Apr 17 9:25:00 2023":

    

    #sets dir name to the current hour

    # checks if dir with time name exsit
    if os.path.exists(os.path.dirname(os.path.realpath(__file__))+"/"+int(time.strftime("%H"))):
        directory = time.strftime("%H")
        path = os.path.join(parent_dir, directory)
        #makes dir
        os.makedirs(path)
    else:
        Camera.capture_file(parentDir((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")




    
    Camera.capture_file(((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")
    time.sleep(60)
    