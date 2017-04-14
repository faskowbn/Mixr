import sys

pourList = {}

for i in range(len(sys.argv)):
    if (i > 0):
        pourList[sys.argv[i][1:]] = sys.argv[i][0]

print(pourList)
sys.stdout.flush()