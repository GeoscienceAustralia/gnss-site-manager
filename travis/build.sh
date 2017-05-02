#!/usr/bin/env nix-shell
#!nix-shell ../default.nix -i bash

set -e

npm install
export CHROME_BIN=chromium
./node_modules/.bin/gulp build.bundle.rxjs
npm run webdriver-update

echo $1

docker build -t e2e-test -f e2e-tests.dockerfile .

docker run -eDISPLAY -v/tmp/.X11-unix:/tmp/.X11-unix -v$.:/home/tester/gnss-site-manager/ e2e-test

npm run build.prod -- --config-env dev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    aws configure set aws_access_key_id "${TRAVIS_AWS_ACCESS_KEY_ID}" --profile geodesy
    aws configure set aws_secret_access_key "${TRAVIS_AWS_SECRET_KEY_ID}" --profile geodesy
    aws configure set region ap-southeast-2 --profile geodesy
    aws configure set output json --profile geodesy
    npm run deploy.dev
fi
