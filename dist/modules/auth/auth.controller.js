"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.profile = exports.renewSession = exports.login = void 0;
const encription_utils_1 = require("../../utils/encription.utils");
const get_user_repository_by_role_1 = require("../../utils/get-user-repository-by-role");
const jwt_utils_1 = require("../../utils/jwt.utils");
const login = async (req, res) => {
    const { id, password, role } = req.body;
    try {
        const collection = (0, get_user_repository_by_role_1.getUserCollectionByRole)(role);
        if (!collection) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: `Param :role does not exists or it is invalid`,
                },
            });
        }
        const user = await collection.getById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "User not found",
                },
            });
        }
        if ((0, encription_utils_1.isEqualToEcryptedField)(password, user.password)) {
            return res.json({
                ok: true,
                data: await (0, jwt_utils_1.signJWT)(role, user.id),
            });
        }
        else {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Invalid id / password",
                },
            });
        }
    }
    catch (error) {
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.login = login;
const renewSession = async (req, res) => { };
exports.renewSession = renewSession;
const profile = async (req, res) => {
    const id = req.id;
    const role = req.role;
    try {
        const collection = (0, get_user_repository_by_role_1.getUserCollectionByRole)(role);
        if (!collection) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: `Param :role does not exists or it is invalid`,
                },
            });
        }
        const user = await collection.getById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "User not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: user,
        });
    }
    catch (error) {
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.profile = profile;
const logout = async (req, res) => { };
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map