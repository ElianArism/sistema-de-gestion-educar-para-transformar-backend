"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const user_model_1 = __importDefault(require("./user.model"));
const ProfessorSchema = new mongoose_1.Schema({
    ...user_model_1.default,
    subjects: [
        {
            type: String,
            default: [],
        },
    ],
});
(0, parse_model_to_json_utilts_1.parseModelToJSON)(ProfessorSchema);
const Professor = (0, mongoose_1.model)("Professor", ProfessorSchema);
exports.default = Professor;
//# sourceMappingURL=professor.model.js.map