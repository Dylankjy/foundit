@echo off

docker build . --tag ghcr.io/dylankjy/foundit-rest-api:latest
docker push ghcr.io/dylankjy/foundit-rest-api:latest
