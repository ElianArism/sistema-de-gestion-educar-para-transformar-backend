"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payFee = exports.updatePassword = exports.getAllUsers = exports.getUserById = exports.deleteUser = exports.updateProfessor = exports.createProfessor = exports.updateStudent = exports.createStudent = exports.updateParent = exports.createParent = exports.createPersonal = exports.createAuthority = void 0;
const authority_model_1 = __importDefault(require("../../db/models/authority.model"));
const parent_model_1 = __importDefault(require("../../db/models/parent.model"));
const personal_model_1 = __importDefault(require("../../db/models/personal.model"));
const professor_model_1 = __importDefault(require("../../db/models/professor.model"));
const student_model_1 = __importDefault(require("../../db/models/student.model"));
const encription_utils_1 = require("../../utils/encription.utils");
const get_user_repository_by_role_1 = require("../../utils/get-user-repository-by-role");
const createAuthority = async (req, res) => {
    const authorityDTO = req.body;
    try {
        const authorityExists = await authority_model_1.default.findOne({ id: authorityDTO.id });
        if (authorityExists) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "authority already exists with this DNI / ID",
                },
            });
        }
        authorityDTO.role = "authority" /* AvailableRoles.authority */;
        authorityDTO.password = (0, encription_utils_1.encrypt)(authorityDTO.password);
        const authorityDoc = new authority_model_1.default({
            ...authorityDTO,
            _id: authorityDTO.id,
        });
        await authorityDoc.save();
        return res.json({
            ok: true,
            data: {
                id: authorityDTO.id,
            },
        });
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
exports.createAuthority = createAuthority;
const createPersonal = async (req, res) => {
    const personalDTO = req.body;
    try {
        const personalExists = await personal_model_1.default.findOne({ id: personalDTO.id });
        if (personalExists) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Personal already exists with this DNI / ID",
                },
            });
        }
        personalDTO.role = "personal" /* AvailableRoles.personal */;
        personalDTO.password = (0, encription_utils_1.encrypt)(personalDTO.password);
        const personalDoc = new personal_model_1.default({ ...personalDTO, _id: personalDTO.id });
        await personalDoc.save();
        return res.json({
            ok: true,
            data: {
                id: personalDTO.id,
            },
        });
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
exports.createPersonal = createPersonal;
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
        parentDTO.role = "parent" /* AvailableRoles.parent */;
        const parentDoc = new parent_model_1.default({ ...parentDTO, _id: parentDTO.id });
        await parentDoc.save();
        return res.json({
            ok: true,
            data: {
                id: parentDTO.id,
            },
        });
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
        const studentExists = await student_model_1.default.findOne({ id: studentDTO.id });
        if (studentExists) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Student already exists with this DNI / ID",
                },
            });
        }
        studentDTO.password = (0, encription_utils_1.encrypt)(studentDTO.password);
        studentDTO.role = "student" /* AvailableRoles.student */;
        const studentDoc = new student_model_1.default({ ...studentDTO, _id: studentDTO.id });
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
        const professorExists = await professor_model_1.default.findOne({ id: professorDTO.id });
        if (professorExists) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Professor already exists with this DNI / ID",
                },
            });
        }
        professorDTO.password = (0, encription_utils_1.encrypt)(professorDTO.password);
        professorDTO.role = "professor" /* AvailableRoles.professor */;
        const professorDoc = new professor_model_1.default({
            ...professorDTO,
            _id: professorDTO.id,
        });
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
const payFee = async (req, res) => {
    const { studentId, ...dto } = req.body;
    try {
        const student = await student_model_1.default.findOne({ id: studentId });
        if (!student) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Student not found",
                },
            });
        }
        const updatedStudent = await student_model_1.default.findOneAndUpdate({ id: studentId }, {
            fees: student?.fees?.length
                ? [...dto.fees, ...student.fees]
                : [...dto.fees],
        }, { new: true });
        return res.json({
            ok: true,
            data: {
                fees: updatedStudent.fees,
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
exports.payFee = payFee;
//# sourceMappingURL=user.controller.js.map