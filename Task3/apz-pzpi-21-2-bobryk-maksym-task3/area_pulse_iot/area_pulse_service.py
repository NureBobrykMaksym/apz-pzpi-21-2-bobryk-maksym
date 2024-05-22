import constants
from wifi_service import WifiService
from http_service import HttpService
from machine import Pin
import time

class AreaPulseService:
    def __init__(self):
        self.wifi_service = WifiService()
        self.http_service = HttpService()  # Pass the wifi_service instance to HttpService
        self.pir_pin = Pin(4, Pin.IN)
        self.led_pin = Pin(15, Pin.OUT)

    def main(self):
        self.wifi_service.connect_to_wifi()
        
        while True:
            try:
                pir_state = self.pir_pin.value()
                if pir_state == 1:
                    print("Motion detected: registering attendance.")
                    self.http_service.register_attendance()
                    self.led_pin.on()
                else:
                    self.led_pin.off()

                time.sleep(5)
            except OSError as e:
                print(f"An error occurred: {e}")
                time.sleep(5)