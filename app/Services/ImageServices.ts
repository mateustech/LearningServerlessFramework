import axios from 'axios'
import * as fs from 'fs'
import { OwnInterface, TypeParams } from '../types'
const sharp = require("sharp")
class ImageProcessing implements OwnInterface {
  public resizeImage = async (path: string, params: TypeParams) => {
    try {
      let rgba: string[] = this.hexToRgba(params?.bg);

      sharp("tmp/original/" + path)
        .resize(params.width, params.height, {
          kernel: sharp.kernel.nearest,
          fit: 'contain',
          position: 'center',
          background: { r: Number(rgba[0]), g: Number(rgba[1]), b: Number(rgba[2]), alpha: 1 }
        })
        .toFile("tmp/resized/" + path)
    } catch (error) {
      throw new Error("Resizing: " + error)
    }
  }

  public fetchImage = (url: string, path: string) => {
    return axios({
      url,
      responseType: 'stream',
    }).then(
      (response: any) => {
        return new Promise<any>((resolve: any, reject: any) => {
          response.data
            .pipe(fs.createWriteStream("tmp/original/" + path))
            .on('finish', () => resolve())
            .on('error', (e: any) => reject(e));
        })
      });
  }

  public getPath = (url: string): string => String(url).split("/").reverse()[0]

  private hexToRgba = (hex: string): string[] => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",").split(",");
    }
    throw new Error('Bad Hex');
  }
}
export const imageProcessing = new ImageProcessing()
