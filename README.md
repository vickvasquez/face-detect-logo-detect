## Clone this repo

## Create folder and put some images

```
mkdir -p public/assets/img
```

## Run server

```
npm install
GOOGLE_APPLICATION_CREDENTIALS=config.json node server.js img.jpg
```

Configure credentials [here](https://console.developers.google.com/apis/api/vision.googleapis.com/overview?project=face-detection-a870e&duration=PT6H)
