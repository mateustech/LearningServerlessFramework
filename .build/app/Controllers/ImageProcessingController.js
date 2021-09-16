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
exports.imageProcessingController = void 0;
const ImageServices_1 = require("../Services/ImageServices");
const sharp = require('sharp');
class ImageProcessingController {
    processing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _params = {
                    url: String(req === null || req === void 0 ? void 0 : req.query.url),
                    bg: String(req.query.bg),
                    width: Number(req.query.width),
                    height: Number(req.query.height),
                };
                const _path = ImageServices_1.imageProcessing.getPath(_params === null || _params === void 0 ? void 0 : _params.url);
                ImageServices_1.imageProcessing.fetchImage(String(_params === null || _params === void 0 ? void 0 : _params.url), _path)
                    .then(() => {
                    ImageServices_1.imageProcessing.resizeImage(_path, _params);
                });
                res.status(200).json({
                    url: req.url,
                    params: _params,
                    method: req.method.toLowerCase(),
                });
            }
            catch (error) {
                throw new Error("Optimized" + error);
            }
        });
    }
}
exports.imageProcessingController = new ImageProcessingController();
//# sourceMappingURL=ImageProcessingController.js.map