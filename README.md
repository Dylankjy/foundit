# Foundit

This project is created as part of a school assignment for Cloud Application Development to design a lost-and-found web application.

## About this repository
This repository is a monorepo consisting of:
- foundit-rest-api: NodeJS REST API + MongoDB
- foundit-ui: ReactJS Frontend

### foundit-rest-api
1. Create an `.env` file containing the appropriate configurations for your environment. You may refer to `app/config/index.js` for a reference for environment variables.
2. Run `npm i` to install dependencies.
3. Run `npm run start` to bring up the REST API service.

Alternative, you may choose to use the service in a Docker container. (Refer to the package section of the repository if you wish to pull directly without building)
If you wish to build the REST API service from source:
1. Run `npm run build:docker-image` to create a new Docker image.
2. Start a Docker container with the image. Remember to pass in your environment file.

### foundit-ui
1. Start the UI by running `npm start`.
2. (If it doesn't automatically do it for you) Navigate to `http://localhost:3000`.

To build a production build of the UI:
1. Run `npm run build`.
2. Deploy the `/build` folder to your preferred website hosting service or S3 bucket.

## Legal
Code in this repository is licensed under GNU AGPL-3.0. A copy may be found in the `LICENSE` file at the root directory of the repository.

##### Plagarism
If you are using this for a school assignment, you are hereby warned, above the warning given by your educational institute, that it constitutes as plagarism if you choose to pass my handwork as your own. Don't be an ass, if I can spend time writing this, you can as well.

Copyright © 2023, Dylan Kok \<me@dylankjy.com\>
