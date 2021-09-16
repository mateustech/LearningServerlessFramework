import * as express from 'express'
import * as serverless from 'serverless-http';
const sharp = require('sharp')

import { imageProcessingController } from './Controllers/ImageProcessingController'
import { lambdaController } from './Controllers/LambdaController'

const app = express();

app.route('/check')
  .all(function (req, res, next) {
    console.info("Good.")
    next()
  })
  .get(lambdaController.index)
  .post(lambdaController.store)
  .put(lambdaController.update)

app.post('/optimized', imageProcessingController.processing);

//app.listen(3000, () => console.log("Running Sucess"))
module.exports.handler = serverless(app);