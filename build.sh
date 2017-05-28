#! /bin/bash
set -ex

npm install
npm install -g @angular/cli
ng build -e prod --base-href https://mukopikmin.github.io/refrii/
cp dist/index.html dist/404.html
