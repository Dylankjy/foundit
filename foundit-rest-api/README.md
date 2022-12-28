# template-node-rest-api
This repository contains the boilerplate for developing Node REST API services.
If you use Visual Studio Code as your IDE, debug configuration will be loaded.

> **Looking for the Python version?**
> 
> A python version of this template can be found [here](https://github.com/harbourfront/template-flask-rest-api).

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

By default, you can visit this at `http://127.0.0.1:5000/v1/docs`. You can run `npm run build-swagger` to rebuild the `swagger.json` documentation file.

## Contribution
If you have any amendments you wish to make, feel free to raise a Pull Request.
Please view `CONTRIBUTING` for more information.


## License
This repository is licensed under the **Mozilla Public License 2.0**. A copy can be found in `LICENSE` located in the project root.