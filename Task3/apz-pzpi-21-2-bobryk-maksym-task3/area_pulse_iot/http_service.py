import urequests
import constants
import json

class HttpService:
    def register_attendance(self):
        url = f"{constants.API_URL}{constants.ATTENDANCE_ENDPOINT}"

        payload = {
            "attendance": {
                "name": "Sensor A",
                "sectorId": constants.SECTOR_ID
            }
        }

        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "ngrok-skip-browser-warning": "true"
        }

        response = urequests.post(url, json=payload, headers=headers)

        if response.status_code == 201:
            print("Attendance is registered!")
            return True
        else:
            return False