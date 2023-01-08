# foundit-reast-api

## Project structure
```
├───.github
│   └───workflows
├───.vscode
└───app
    ├───api
    │   └───index
    ├───config
    ├───models
    └───utils
```

## How to use
**Starting the server**

Run `app.js` and *boom*, the server is alive. By default, the server will bind to port `5000`, you can change this using the `PORT` environment variable.

**Viewing the Swagger API documentation**

By default, you can visit this at `http://127.0.0.1:5000/docs`. You can run `npm run build:swagger` to rebuild the `swagger.json` documentation file.

## License
This RESY API was created using [template-express-rest-api](https://github.com/harbourfront/template-express-rest-api), licensed under the **Mozilla Public License 2.0**.
