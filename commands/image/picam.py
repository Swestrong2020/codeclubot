import time
import picamera2

picam2 = picamera2.Picamera2()

preview_config = picam2.create_preview_configuration(main={"size": (800, 600)})
picam2.configure(preview_config)

picam2.start()

while 1:

	metadata = picam2.capture_file("last.jpeg")

	time.sleep(1)

picam2.close()
