#!/usr/bin/env sh

publishDBImage() {
  sudo docker build -t kvezal/cities-postgres:latest ./docker/postgres
  sudo docker push kvezal/cities-postgres:latest
}

publishApiImage() {
  sudo docker build -t kvezal/cities-api:latest -f docker/api/Dockerfile .
  sudo docker push kvezal/cities-api:latest
}

if [ -z $1 ]
then
  publishDBImage
  publishApiImage
elif [ $1 = db ]
then
  publishDBImage
elif [ $1 = api ]
then
  publishApiImage
fi
