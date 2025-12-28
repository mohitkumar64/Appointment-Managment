import socket
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

MESSAGE = b"CAMERA_SERVER"

while True:
    sock.sendto(MESSAGE, ("255.255.255.255", 5050))
    time.sleep(1)
