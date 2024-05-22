import network
import constants
import time

class WifiService:
     def connect_to_wifi(self):
        wlan = network.WLAN(network.STA_IF)
        wlan.active(True)

        if not wlan.isconnected():
            print("Connecting to network", end="")
            wlan.connect(constants.WIFI_SSID, constants.WIFI_PASSWORD)
            while not wlan.isconnected():
                print(".", end="")
                time.sleep(0.5)

        print('network config:', wlan.ifconfig())