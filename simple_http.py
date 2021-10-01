import http.server
import socketserver
import sys
import time
import requests
import json
import threading
import http.server
import socketserver

def fetch_openweather():
    ###Fetch current weather data from https://openweathermap.org/current
    my_api_key = '42dee1402cca0f1316a87e94e68784b6'
    url_string = 'https://api.openweathermap.org/data/2.5/weather?id=5370082&appid='+my_api_key
    #While the server is running, make an API request for a JSON file every hours
    timeout = 0
    while (True):
        response = requests.request('GET', url_string)
        if (response.status_code != 200):
            print('API request failed with status code: ' + str(response.status_code))
            #If a API call fails wait 10 mins and call again increment timeout
            time.sleep((timeout+1)*300)
            timeout = timeout + 1
        else:
            #reset timeout counter just incase its been incremented
            timeout=0
            print('API contacted successfully... dumping to file system')
            json_response = response.json()
            with open('./js/json/current_weather.json', 'w') as f:
                json.dump(json_response, f)
            #After a successful JSON Grab, wait 3 hours to refresh data from API
            time.sleep(3*3600)
#https://stackabuse.com/serving-files-with-pythons-simplehttpserver-module/
class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'superimpose.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def start_server():

    PORT = 8777

    print("starting server on localhost:"+str(PORT))

    # Create an object of the above class
    handler_object = MyHttpRequestHandler

    my_server = socketserver.TCPServer(("", PORT), handler_object)

    print('Server request handled; Server started')
    # Star the server
    my_server.serve_forever()



if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server)
    api_thread = threading.Thread(target=fetch_openweather)

    api_thread.start()
    #
    time.sleep(5)
    server_thread.start()
    #No logic beyond thread start, or IDK what will happen
