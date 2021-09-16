import * as express from 'express'
import * as serverless from 'serverless-http';

import { lambdaController } from './Controllers/LambdaController'

const app = express();

app.get("/lambda",lambdaController.index)
  
module.exports.handler = serverless(app);