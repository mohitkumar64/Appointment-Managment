import socket
import cv2
import numpy as np

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", 5000))

print("Listening...")

while True:
    data, _ = sock.recvfrom(65536)

    frame = cv2.imdecode(
        np.frombuffer(data, np.uint8),
        cv2.IMREAD_COLOR
    )

    if frame is None:
        continue

    cv2.imshow("Stream", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break
