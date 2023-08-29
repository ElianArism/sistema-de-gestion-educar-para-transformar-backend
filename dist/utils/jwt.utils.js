"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJWT = (role, id) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({
            role,
            id,
        }, process.env?.JWT_SECRET_KEY ?? "", {
            expiresIn: "12h",
        }, (error, token) => {
            if (error) {
                return reject({
                    error: {
                        message: "Error signing JWT",
                        error,
                    },
                });
            }
            return resolve(token);
        });
    });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env?.JWT_SECRET_KEY ?? "", {}, (error, decoded) => {
            if (error) {
                return reject({
                    valid: false,
                });
            }
            return resolve({
                valid: true,
                data: {
                    id: decoded.id,
                    role: decoded.role,
                },
            });
        });
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.utils.js.map