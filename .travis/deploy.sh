#!/bin/bash

eval "$(ssh-agent -s)"
chmod 600 ./deploy.key
ssh-add ./deploy.key
ssh-keyscan igpolytech.fr >> ~/.ssh/known_hosts
if [ "$1" = "production" ]; then
  git remote add deploy dokku@igpolytech.fr:api-formatech
  git config --global push.default simple
  git push deploy master
elif [ "$1" = "staging" ]; then
  git remote add deploy dokku@igpolytech.fr:test-api-formatech
  git config --global push.default simple
  git push deploy dev:master
else
  echo "Incorrect environment, usage deploy.sh [production | staging]"
	exit 1
fi