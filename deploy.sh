#! /bin/bash
set -ex

./node_modules/.bin/ng build --prod --base-href "https://mukopikmin.github.io/refrii/"
cp dist/index.html dist/404.html
./node_modules/.bin/angular-cli-ghpages
