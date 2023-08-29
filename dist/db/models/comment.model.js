"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const commentSchema = new mongoose_1.Schema({
    description: {
        required: true,
        type: String,
        maxlength: 500,
    },
    rating: {
        type: Number,
        required: false,
    },
    name: {
        required: false,
        type: String,
        maxlength: 50,
    },
    date: {
        required: true,
        type: String,
    },
});
(0, parse_model_to_json_utilts_1.parseModelToJSON)(commentSchema);
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.model.js.map