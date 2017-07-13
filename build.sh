#! /bin/bash
set -ex

npm install
npm install -g @angular/cli
ng build -e prod --base-href https://refrii.com/
cp dist/index.html dist/404.html
echo refrii.com > dist/CNAME
