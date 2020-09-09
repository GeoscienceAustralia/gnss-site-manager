#!/usr/bin/env bash

set -e

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 env, where env is dev, test, prod, etc."
    exit 1
fi

env=$1

if [ "$env" == "prod" ]; then
    bucket="gnss-site-manager"
else
    bucket="$env-gnss-site-manager"
fi

backupBucket=$bucket-backup
timestamp=$(date +'%Y%m%dT%H%M%S')

if aws s3 --profile geodesy ls "s3://$backupBucket" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 --profile geodesy mb "s3://$backupBucket"
fi

aws s3 --profile geodesy sync "s3://$bucket" "s3://$backupBucket/$timestamp"
aws s3 --profile geodesy rm "s3://$bucket" --recursive
aws s3 --profile geodesy sync dist/prod "s3://$bucket" --acl public-read
