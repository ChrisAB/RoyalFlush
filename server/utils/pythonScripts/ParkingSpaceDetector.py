import cv2
import pickle
import cvzone
import numpy as np
import sys

with open(sys.argv[2], 'rb') as f:
    posList = pickle.load(f)
 
width, height = 107, 48

img = cv2.imread(sys.argv[1])

def checkParkingSpace(imgPro):
  occupiedPositionsList = []
  spaceCounter = 0

  for pos in posList:
      x = 0
      y = 0
      if len(pos) == 2:
        x, y = pos
      else:
        x, y, positionLabel = pos

      imgCrop = imgPro[y:y + height, x:x + width]
      # cv2.imshow(str(x * y), imgCrop)
      count = cv2.countNonZero(imgCrop)

      if count < 900:
          color = (0, 255, 0)
          thickness = 5
          occupiedPositionsList.append((x, y))
          spaceCounter += 1
      else:
          color = (0, 0, 255)
          thickness = 2

      cv2.rectangle(img, (x, y), (pos[0] + width, pos[1] + height), color, thickness)
      cvzone.putTextRect(img, str(count), (x, y + height - 3), scale=1,
                          thickness=2, offset=0, colorR=color)

  cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,
                          thickness=5, offset=20, colorR=(0,200,0))
  
  return occupiedPositionsList
 
def processImage(baseImg):
  imgGray = cv2.cvtColor(baseImg, cv2.COLOR_BGR2GRAY)
  imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
  imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                        cv2.THRESH_BINARY_INV, 25, 16)
  imgMedian = cv2.medianBlur(imgThreshold, 5)
  kernel = np.ones((3, 3), np.uint8)
  return cv2.dilate(imgMedian, kernel, iterations=1)

processedImage = processImage(img)
parkingSpaceSituation = checkParkingSpace(processedImage)
# cv2.imshow("Image", img)
# cv2.imshow("ImageBlur", imgBlur)
# cv2.imshow("ImageThres", imgMedian)
# cv2.waitKey(0)

print(parkingSpaceSituation)