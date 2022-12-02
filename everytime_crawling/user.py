#!/usr/bin/env python

import requests
import json
import csv

url = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

def addUser(data):
    response = requests.post(url + "/adduser", json=(data))
    return response

if __name__ == "__main__":
    
    for i in range(10,30):
        id = "20203121" + str(i)
        name = "Student" + str(i)

        temp = {}   
        temp["id"] = id
        temp["name"] = name

        res = addUser(temp)
        print(res)

