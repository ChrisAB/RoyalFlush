import cv2
import pickle
import cvzone
import numpy as np
import sys

carList = []

with open(sys.argv[1], 'rb') as f:
  posList = pickle.load(f)
 
for pos in posList:
  x = 0
  y = 0
  if len(pos) == 2:
    x, y = pos
    carList.append((x, y, "None"))
  else:
    x, y, positionLabel = pos
    carList.append((x, y, positionLabel))

print(carList)
