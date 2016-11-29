#!/usr/bin/env python3
import requests, json
url = "http://localhost:8080/ad"
payload = json.load(open('requests.json'))
headers = {'content-type':'application/json'}
r = requests.post(url, data=json.dumps(payload),headers=headers)
