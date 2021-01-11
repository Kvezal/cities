#!/usr/bin/env sh

cityapi -idb

if [ $1 = fake ]
then
  cityapi -fdb 100
fi

npm run start