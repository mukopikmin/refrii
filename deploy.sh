#! /bin/sh
set -ex
ng build -e prod
cp Staticfile dist/
cf push
