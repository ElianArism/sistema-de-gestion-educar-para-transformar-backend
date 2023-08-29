"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        if (!process.env.CONN_STR)
            throw new Error("Connection String not found in .env");
        await mongoose_1.default.connect(process.env.CONN_STR);
        console.log("DB running!");
    }
    catch (error) {
        console.log("Error trying to connect to DB", error);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=connect-db.js.map