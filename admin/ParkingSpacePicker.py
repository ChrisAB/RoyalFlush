import cv2
import pickle
import easygui
import sys

width, height = 107, 48

try:
    with open(sys.argv[2], 'rb') as f:
        posList = pickle.load(f)
except:
    posList = []


X1, Y1, X2, Y2 = 0, 0, 0, 0

def mouseClick(events, x, y, flags, params):
  global X1, Y1, X2, Y2
  if events == cv2.EVENT_LBUTTONDOWN:
      X1 = x
      Y1 = y
  if events == cv2.EVENT_LBUTTONUP:
    X2 = x
    Y2 = y
    positionLabel = easygui.enterbox("Label for this spot")
    posList.append((X1, Y1, X2, Y2, positionLabel))
  if events == cv2.EVENT_RBUTTONDOWN:
      for i, pos in enumerate(posList):
          x1 = 0
          y1 = 0
          if len(pos) == 2:
            x1, y1 = pos
          else:
            x1, y1, x2, y2, positionLabel = pos
          if x1 < x < x2 and y1 < y < y2:
              posList.pop(i)

  with open(sys.argv[2], 'wb') as f:
      pickle.dump(posList, f)


while True:
    img = cv2.imread(sys.argv[1])
    for pos in posList:
        cv2.rectangle(img, (pos[0], pos[1]), (pos[2], pos[3]), (255, 0, 255), 2)
        cv2.putText(img, pos[4], (pos[0], int((pos[1] + pos[3])/2)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    cv2.imshow("Image", img)
    cv2.setMouseCallback("Image", mouseClick)
    cv2.waitKey(1)