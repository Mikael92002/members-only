#!/usr/bin/env bash
set -e

# build client
cd client/members-only
npm ci
npm run build

# install server deps
cd ../../server
npm ci

# ensure NODE_ENV=production for serving the built static files
export NODE_ENV=${NODE_ENV:-production}

# start server
node app.js