For executing challengeA.js and challengeB.js on terminal please run the below code:

node FILENAME

For running the Dockerfile in the Docker Desktop (powershell):
Navigate to the folder then run the following lines in terminal

docker build -t kasagi-labo-challenge .
docker run -v ${PWD}/output:/usr/src/app/output kasagi-labo-challenge



- After executing the challengeA.js, a file named randomObjects.txt with size of 10MB will be created containing 4 different printable objects (strings) as mentioned in the challengeA
- The output of the challengeB will be logged and stored in /usr/src/app/output/output.txt in the docker container and /output/output.txt in your host device
