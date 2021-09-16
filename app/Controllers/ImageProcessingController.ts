import { Request, Response } from 'express'
import { imageProcessing } from '../Services/ImageServices'
import { TypeParams } from '../types'
const sharp = require('sharp')

class ImageProcessingController {
    public async processing(req: Request, res: Response) {
        try {
            const _params: TypeParams = {
              url: String(req?.query.url),
              bg: String(req.query.bg),
              width: Number(req.query.width),
              height: Number(req.query.height),
            }
        
            const _path: string = imageProcessing.getPath(_params?.url)
        
            imageProcessing.fetchImage(String(_params?.url), _path)
            .then(() => {
              imageProcessing.resizeImage(_path,_params)
            })
            
            res.status(200).json({
              url: req.url,
              params: _params,
              method: req.method.toLowerCase(),
            });
          } catch (error) {
            throw new Error("Optimized" + error)
          }
    }
}

export const imageProcessingController = new ImageProcessingController()