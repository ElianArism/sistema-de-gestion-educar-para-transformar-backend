"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const NewsSchema = new mongoose_1.Schema({
    description: {
        type: String,
        default: "Sin descripcion",
    },
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    imgUrl: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
        default: new Date().toISOString(),
    },
    // TODO: Add in V2
    // authorId: {
    //   type: Types.ObjectId,
    //   ref: 'Admin'
    // }
});
(0, parse_model_to_json_utilts_1.parseModelToJSON)(NewsSchema);
const News = (0, mongoose_1.model)("News", NewsSchema);
exports.default = News;
//# sourceMappingURL=news.model.js.map