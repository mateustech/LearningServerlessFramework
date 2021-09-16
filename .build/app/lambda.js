"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const serverless = require("serverless-http");
const LambdaController_1 = require("./Controllers/LambdaController");
const app = express();
app.get("/lambda", LambdaController_1.lambdaController.index);
module.exports.handler = serverless(app);
//# sourceMappingURL=lambda.js.map