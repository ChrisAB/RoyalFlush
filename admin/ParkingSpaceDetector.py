import cv2
import pickle
import cvzone
import numpy as np
import sys

with open(sys.argv[2], 'rb') as f:
    posList = pickle.load(f)
 
img = cv2.imread(sys.argv[1])

def checkParkingSpace(imgPro):
  freePositionsList = []
  spaceCounter = 0

  for pos in posList:
      X1, Y1, X2, Y2, positionLabel = pos

      imgCrop = imgPro[Y1:Y2, X1:X2]
      # cv2.imshow(str(X1 * Y1), imgCrop)
      count = cv2.countNonZero(imgCrop)

      threshold = (X2 - X1) * (Y2 - Y1)/5

      if count < threshold:
          color = (0, 255, 0)
          thickness = 5
          freePositionsList.append((X1, Y1, X2, Y2))
          spaceCounter += 1
      else:
          color = (0, 0, 255)
          thickness = 2

      cv2.rectangle(img, (X1, Y1), (X2, Y2), color, thickness)
      cvzone.putTextRect(img, str(count), (X1, Y2- 3), scale=1,
                          thickness=2, offset=0, colorR=color)

  cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,
                          thickness=5, offset=20, colorR=(0,200,0))
  
  return freePositionsList
 
def processImage(baseImg):
  imgGray = cv2.cvtColor(baseImg, cv2.COLOR_BGR2GRAY)
  imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 0)
  imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                        cv2.THRESH_BINARY_INV, 25, 16)
  imgMedian = cv2.medianBlur(imgThreshold, 7)
  kernel = np.ones((3, 3), np.uint8)
  return cv2.dilate(imgMedian, kernel, iterations=1)

processedImage = processImage(img)
parkingSpaceSituation = checkParkingSpace(processedImage)
cv2.imshow("Image", img)
# cv2.imshow("ImageBlur", imgBlur)
# cv2.imshow("ImageThres", imgMedian)
cv2.waitKey(0)

print(parkingSpaceSituation)