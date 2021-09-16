"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const serverless = require("serverless-http");
const sharp = require('sharp');
const ImageProcessingController_1 = require("./Controllers/ImageProcessingController");
const LambdaController_1 = require("./Controllers/LambdaController");
const app = express();
app.route('/health')
    .all(function (req, res, next) {
    console.info("Good.");
    next();
})
    .get(LambdaController_1.lambdaController.index)
    .post(LambdaController_1.lambdaController.store)
    .put(LambdaController_1.lambdaController.update);
app.post('/optimized', ImageProcessingController_1.imageProcessingController.processing);
//app.listen(3000, () => console.log("Running Sucess"))
module.exports.handler = serverless(app);
//# sourceMappingURL=server.js.map