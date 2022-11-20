#!/usr/bin/env python

import requests
import csv

url = "https://rpyy83l3r1.execute-api.ap-northeast-2.amazonaws.com/dev"

def postcourse(params):
    response = requests.post(url + "/", params)


if __name__ == "__main__":
    with open("everytime_info_6.csv", newline="", encoding= "UTF8") as csvfile:
        spamreader = csv.reader(csvfile, delimiter=",", quotechar="\n")
        for row in spamreader:
            temp2 = {

            }
            temp2["college"] = row[0]
            temp2["dep"] = row[1]
            temp2["course_id"] = row[3]
            temp2["name"] = row[4]
            temp2["professor"] = row[5]

            print(temp2)