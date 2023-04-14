from picamera2 import Picamera2, Preview
import time

Camera = Picamera2()
CameraConfig = Camera.create_preview_configuration()
Camera.configure(CameraConfig)
Camera.start_preview(Preview.QTGL)
Camera.start()
LocalTime = time.asctime

while LocalTime != "Mon Apr 17 9:25:00 2023":
    time.sleep(2)
    Camera.capture_file(((time.asctime()).replace(" ", "_", -1).replace(":","-",-1))+".jpg")
    time.sleep(60)
    