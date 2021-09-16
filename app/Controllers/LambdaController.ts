import { Request, Response } from 'express'

class LambdaController {
    public async index(req: Request, res: Response) {
      res.status(200).json({
        url: req.url,
        method: req.method.toLowerCase(),
      });
    }

    public async store(req: Request, res: Response) {
      res.status(200).json({
        url: req.url,
        method: req.method.toLowerCase(),
        body: req.body
      });
    }

    public async update(req: Request, res: Response) {
      res.status(200).json({
        url: req.url,
        method: req.method.toLowerCase(),
        params: req.params,
        body: req.body,
      });
    }
}

export const lambdaController = new LambdaController()