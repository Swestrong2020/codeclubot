from picamera2 import Picamera2, Preview
import time
import os
import configparser

#opens configPiCam.env
config = configparser.ConfigParser()
config.read('configPiCam.env')


SetDate = config.get('DEFAULT', 'setdate')
ImgTime = config.get('DEFAULT', 'imgtime')

#starts camera
Camera = Picamera2()
CameraConfig = Camera.create_preview_configuration()
Camera.configure(CameraConfig)
# Camera.start_preview(Preview.QTGL)
Camera.start()

StartTime = int(time.strftime("%H"))
directory = StartTime 
parentDir = os.path.dirname(os.path.realpath(__file__))+"/commands/image"
LocalTime = (time.strftime("%a %b %d")).lower()

time.sleep(2)


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


Camera.stop()
