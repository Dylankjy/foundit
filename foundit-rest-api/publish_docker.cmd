@echo off
LABEL org.opencontainers.image.source https://github.com/dylankjy/foundit

docker build . --tag ghcr.io/dylankjy/foundit-rest-api:latest
docker push ghcr.io/dylankjy/foundit-rest-api:latest
