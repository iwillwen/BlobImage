#!/bin/bash

node_modules/.bin/uglifyjs \
  src/blobimage.js \
  src/manager.js \
  --mangle \
  --compress \
  -o dist/blobimage.min.js \
  --source-map dist/blobimage.min.js.map \
  --source-map-url blobimage.min.js.map 