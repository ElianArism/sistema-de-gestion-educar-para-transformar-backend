"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const user_model_1 = __importDefault(require("./user.model"));
const AuthoritySchema = new mongoose_1.Schema(user_model_1.default);
(0, parse_model_to_json_utilts_1.parseModelToJSON)(AuthoritySchema);
const Authority = (0, mongoose_1.model)("Authority", AuthoritySchema);
exports.default = Authority;
//# sourceMappingURL=authority.model.js.map