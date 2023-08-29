"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.getAllUsers = exports.getUserById = exports.deleteUser = exports.updateProfessor = exports.createProfessor = exports.updateStudent = exports.createStudent = exports.updateParent = exports.createParent = void 0;
const parent_model_1 = __importDefault(require("../../db/models/parent.model"));
const student_model_1 = __importDefault(require("../../db/models/student.model"));
const encription_utils_1 = require("../../utils/encription.utils");
const get_user_repository_by_role_1 = require("../../utils/get-user-repository-by-role");
const createParent = async (req, res) => {
    const parentDTO = req.body;
    try {
        const parentExists = await parent_model_1.default.findOne({ id: parentDTO.id });
        if (parentExists) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Parent already exists with this DNI / ID",
                },
            });
        }
        parentDTO.password = (0, encription_utils_1.encrypt)(parentDTO.password);
        const parentDoc = new parent_model_1.default(parentDTO);
        await parentDoc.save();
        return {
            ok: true,
            data: {
                id: parentDTO.id,
            },
        };
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.createParent = createParent;
const updateParent = async (req, res) => {
    const id = req.params.id;
    const { role, id: parentId, son, password, ...parentDTO } = req.body;
    if (!id) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const parentUpdated = await parent_model_1.default.findOneAndUpdate({ id }, parentDTO);
        if (!parentUpdated) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Parent does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: parentUpdated,
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
exports.updateParent = updateParent;
const createStudent = async (req, res) => {
    const studentDTO = req.body;
    try {
        studentDTO.password = (0, encription_utils_1.encrypt)(studentDTO.password);
        const studentDoc = new student_model_1.default(studentDTO);
        await studentDoc.save();
        return res.json({
            ok: true,
            data: {
                id: studentDoc.id,
            },
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
exports.createStudent = createStudent;
const updateStudent = async (req, res) => {
    const { password, id, role, ...studentDTO } = req.body;
    const studentId = req.params?.id;
    if (!studentId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const studentUpdated = await student_model_1.default.findOneAndUpdate({ id: studentId }, studentDTO);
        if (!studentUpdated) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Student not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: {
                id: studentUpdated.id,
            },
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
exports.updateStudent = updateStudent;
const createProfessor = async (req, res) => {
    const professorDTO = req.body;
    try {
        professorDTO.password = (0, encription_utils_1.encrypt)(professorDTO.password);
        const professorDoc = new student_model_1.default(professorDTO);
        await professorDoc.save();
        return res.json({
            ok: true,
            data: {
                id: professorDoc.id,
            },
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
exports.createProfessor = createProfessor;
const updateProfessor = async (req, res) => {
    const { password, id, role, ...professorDTO } = req.body;
    const professorId = req.params?.id;
    try {
        const professorUpdated = await student_model_1.default.findOneAndUpdate({ id: professorId }, professorDTO);
        if (!professorUpdated) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Student not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: {
                id: professorUpdated.id,
            },
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
exports.updateProfessor = updateProfessor;
const deleteUser = async (req, res) => {
    const id = req.params?.id;
    const role = req.params?.role?.toLowerCase();
    if (!id || !role) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `Param :${!id ? "id" : "role"} is required`,
            },
        });
    }
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
        const userDeleted = await collection.delete(id);
        if (!userDeleted) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "User not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: userDeleted,
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
exports.deleteUser = deleteUser;
const getUserById = async (req, res) => {
    const id = req.params?.id;
    const role = req.params?.role?.toLowerCase();
    if (!id || !role) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `Param :${!id ? "id" : "role"} is required`,
            },
        });
    }
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
exports.getUserById = getUserById;
const getAllUsers = async (req, res) => {
    const role = req.params?.role?.toLowerCase() ?? "";
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
        const users = await collection.get();
        return res.json({
            ok: true,
            data: users,
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
exports.getAllUsers = getAllUsers;
const updatePassword = async (req, res) => {
    const { id, password, newPassword } = req.body;
    const { role } = req;
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
        else if (!(0, encription_utils_1.isEqualToEcryptedField)(password, user.password)) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Invalid password",
                },
            });
        }
        await collection.updatePassword(id, newPassword);
        return res.json({
            ok: true,
            data: {
                id,
            },
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
exports.updatePassword = updatePassword;
//# sourceMappingURL=user.controller.js.map