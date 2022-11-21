#!/usr/bin/env python

import requests
import json
import csv

url = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

def postLecture(data):
    response = requests.post(url + "/addlecture", json=(data))
    return response


if __name__ == "__main__":
    with open("everytime_info_1.csv", newline="", encoding= "UTF8") as csvfile:
        spamreader = csv.reader(csvfile, delimiter=",", quotechar="\n")
        for row in spamreader:
            if row[1] == "전공영역2":
                continue
            temp2 = {

            }
            temp2["college"] = row[0]
            temp2["dept"] = row[1]
            temp2["id"] = row[3]
            temp2["name"] = row[4]
            temp2["prof"] = row[5]

            # print(temp2)
            res = postLecture(temp2)
            print(res)
            
            