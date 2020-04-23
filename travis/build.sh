#!/usr/bin/env bash

set -e

npm run tests.all

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    aws configure set aws_access_key_id "${TRAVIS_AWS_ACCESS_KEY_ID}" --profile geodesy
    aws configure set aws_secret_access_key "${TRAVIS_AWS_SECRET_KEY_ID}" --profile geodesy
    aws configure set region ap-southeast-2 --profile geodesy
    aws configure set output json --profile geodesy
    case "${TRAVIS_BRANCH}" in
        "test")
            npm run build.prod -- --config-env test
            ./deploy.sh test
        ;;
        "prod")
            npm run build.prod -- --config-env prod
            ./deploy.sh prod
        ;;
        *)
            npm run build.prod -- --config-env dev
            ./deploy.sh dev
        ;;
    esac
else
    npm run build.prod -- --config-env dev
fi
