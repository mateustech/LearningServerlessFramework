import * as express from 'express'
import * as serverless from 'serverless-http';

import { imageProcessingController } from './Controllers/ImageProcessingController'
import { lambdaController } from './Controllers/LambdaController'

const app = express();
app.use(express.json())

app.route('/check')
  .all(lambdaController.generic)

app.post('/optimized', imageProcessingController.processing);

app.get("/lambda",lambdaController.generic)

module.exports.handler = serverless(app);