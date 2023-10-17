"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = {
    _id: {
        type: String,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    birthDate: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
};
exports.default = UserSchema;
//# sourceMappingURL=user.model.js.map