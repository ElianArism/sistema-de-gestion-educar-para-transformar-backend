"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.getSubjectById = exports.getSubjects = exports.updateSubject = exports.createSubject = void 0;
const subject_model_1 = __importDefault(require("../../db/models/subject.model"));
const createSubject = async (req, res) => {
    const subjectDTO = req.body;
    try {
        const subjectDoc = new subject_model_1.default(subjectDTO);
        await subjectDoc.save();
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
exports.createSubject = createSubject;
const updateSubject = async (req, res) => {
    const subjectDTO = req.body;
    const subjectId = req.params.id;
    if (!subjectId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const subjectUpdated = await subject_model_1.default.findByIdAndUpdate(subjectId, subjectDTO);
        if (!subjectUpdated) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "subject does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: {
                id: subjectId,
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
exports.updateSubject = updateSubject;
const getSubjects = async (req, res) => {
    try {
        return res.json({
            ok: true,
            data: await subject_model_1.default.find(),
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
exports.getSubjects = getSubjects;
const getSubjectById = async (req, res) => {
    const subjectId = req.params.id;
    if (!subjectId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const subject = await subject_model_1.default.findById(subjectId);
        if (!subject) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "subject does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: subject,
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
exports.getSubjectById = getSubjectById;
const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;
    if (!subjectId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const subject = await subject_model_1.default.findByIdAndDelete(subjectId);
        if (!subject) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "subject does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: subject,
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
exports.deleteSubject = deleteSubject;
//# sourceMappingURL=subject.controller.js.map