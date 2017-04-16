import sys
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

pourList = {}
containerMapping = {'vodka':21,'tequila':24,'lemonade':23,'orangeJuice':18,'sprite':14}

print(sys.argv)

for i in range(len(sys.argv)):
    if (i > 0):
        pourList[sys.argv[i][1:]] = sys.argv[i][0]

print(pourList)

if ('vodka' in pourList):
    GPIO.setup(containerMapping['vodka'], GPIO.OUT)
    GPIO.output(containerMapping['vodka'], GPIO.LOW)
    time.sleep(float(pourList['vodka']))
    GPIO.output(containerMapping['vodka'], GPIO.HIGH)
    print('Serving vodka for ' + pourList['vodka'] + ' seconds.')
if ('tequila' in pourList):
    GPIO.setup(containerMapping['tequila'], GPIO.OUT)
    GPIO.output(containerMapping['tequila'], GPIO.LOW)
    time.sleep(float(pourList['tequila']))
    GPIO.output(containerMapping['tequila'], GPIO.HIGH)
    print('Serving tequila for ' + pourList['tequila'] + ' seconds.')
if ('lemonade' in pourList):
    GPIO.setup(containerMapping['lemonade'], GPIO.OUT)
    GPIO.output(containerMapping['lemonade'], GPIO.LOW)
    time.sleep(float(pourList['lemonade']))
    GPIO.output(containerMapping['lemonade'], GPIO.HIGH)
    print('Serving lemonade for ' + pourList['lemonade'] + ' seconds.')
if ('orangeJuice' in pourList):
    GPIO.setup(containerMapping['orangeJuice'], GPIO.OUT)
    GPIO.output(containerMapping['orangeJuice'], GPIO.LOW)
    time.sleep(float(pourList['orangeJuice']))
    GPIO.output(containerMapping['orangeJuice'], GPIO.HIGH)
    print('Serving OJ for ' + pourList['orangeJuice'] + ' seconds.')
if ('sprite' in pourList):
    GPIO.setup(containerMapping['sprite'], GPIO.OUT)
    GPIO.output(containerMapping['sprite'], GPIO.LOW)
    time.sleep(float(pourList['sprite']))
    GPIO.output(containerMapping['sprite'], GPIO.HIGH)
    print('Serving sprite for ' + pourList['sprite'] + ' seconds.')
