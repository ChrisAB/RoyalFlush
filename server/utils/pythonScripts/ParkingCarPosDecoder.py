import cv2
import pickle
import cvzone
import numpy as np
import sys

carList = []

with open(sys.argv[1], 'rb') as f:
  posList = pickle.load(f)
 
for pos in posList:
  X1, Y1, X2, Y2, positionLabel = pos
  carList.append((X1, Y1, X2, Y2, positionLabel))

print(carList)
