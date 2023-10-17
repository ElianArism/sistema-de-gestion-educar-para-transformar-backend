"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const ParentSchema = new mongoose_1.Schema({
    ...user_model_1.default,
    son: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Students",
        required: true,
    },
}, { _id: false });
const Parent = (0, mongoose_1.model)("Parent", ParentSchema);
exports.default = Parent;
//# sourceMappingURL=parent.model.js.map