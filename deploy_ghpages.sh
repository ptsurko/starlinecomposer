#!/bin/bash

# This makes sure, that we don't deploy pull requests to gh-pages :-)
if [ $TRAVIS_PULL_REQUEST != false ];
  then
  echo "Not deploying test-run for a pull request"
  exit 0
fi

(
  echo "Pushing build to ${GH_REF} gh-pages branch."
  git checkout -b gh-pages
  git config user.name "Travis-CI"
  git config user.email "travis@nodemeatspace.com"
  git add .
  git add bower_components -f
  git add node_modules -f
  git commit -m "Deployed to Github Pages"
  git branch
  git push --force "https://${GH_TOKEN}@${GH_REF}" gh-pages:gh-pages
)
