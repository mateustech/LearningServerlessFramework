import { Request, Response } from 'express'

class LambdaController {
    public async generic(req: Request, res: Response) {
      res.status(200).json({
        url: req.url,
        method: req.method.toLowerCase(),
        message: "Success",
        body: req.body,
        querys: req.query
      });
    }
}

export const lambdaController = new LambdaController()