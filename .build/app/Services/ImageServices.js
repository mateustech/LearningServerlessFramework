"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProcessing = void 0;
const axios_1 = require("axios");
const fs = require("fs");
const sharp = require("sharp");
class ImageProcessing {
    constructor() {
        this.resizeImage = (path, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                let rgba = this.hexToRgba(params === null || params === void 0 ? void 0 : params.bg);
                sharp("tmp/original/" + path)
                    .resize(params.width, params.height, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'center',
                    background: { r: Number(rgba[0]), g: Number(rgba[1]), b: Number(rgba[2]), alpha: 1 }
                })
                    .toFile("tmp/resized/" + path);
            }
            catch (error) {
                throw new Error("Resizing: " + error);
            }
        });
        this.fetchImage = (url, path) => {
            return (0, axios_1.default)({
                url,
                responseType: 'stream',
            }).then((response) => {
                return new Promise((resolve, reject) => {
                    response.data
                        .pipe(fs.createWriteStream("tmp/original/" + path))
                        .on('finish', () => resolve())
                        .on('error', (e) => reject(e));
                });
            });
        };
        this.getPath = (url) => String(url).split("/").reverse()[0];
        this.hexToRgba = (hex) => {
            let c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length === 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",").split(",");
            }
            throw new Error('Bad Hex');
        };
    }
}
exports.imageProcessing = new ImageProcessing();
//# sourceMappingURL=ImageServices.js.map