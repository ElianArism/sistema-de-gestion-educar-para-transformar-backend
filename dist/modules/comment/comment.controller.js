"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getCommentById = exports.getComments = exports.createComment = void 0;
const comment_model_1 = __importDefault(require("../../db/models/comment.model"));
const createComment = async (req, res) => {
    const comment = req.body;
    try {
        const commentDoc = new comment_model_1.default(comment);
        await commentDoc.save();
        return res.json({
            ok: true,
            data: comment,
        });
    }
    catch (error) {
        return res.status(error?.status || 500).json({
            ok: false,
            error: {
                message: error?.message || "",
                error,
            },
        });
    }
};
exports.createComment = createComment;
const getComments = async (req, res) => {
    try {
        return res.json({
            ok: true,
            data: (await comment_model_1.default.find()) ?? [],
        });
    }
    catch (error) {
        return res.status(error?.status || 500).json({
            ok: false,
            error: {
                message: error?.message || "",
                error,
            },
        });
    }
};
exports.getComments = getComments;
const getCommentById = async (req, res) => {
    const commentId = req.params?.id ?? "";
    if (!commentId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const comment = await comment_model_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Comment not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: comment,
        });
    }
    catch (error) {
        return res.status(error?.status || 500).json({
            ok: false,
            error: {
                message: error?.message || "",
                error,
            },
        });
    }
};
exports.getCommentById = getCommentById;
const deleteComment = async (req, res) => {
    const commentId = req.params?.id ?? "";
    if (!commentId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const comment = await comment_model_1.default.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "Comment not found",
                },
            });
        }
        return res.json({
            ok: true,
            data: comment,
        });
    }
    catch (error) {
        return res.status(error?.status || 500).json({
            ok: false,
            error: {
                message: error?.message || "",
                error,
            },
        });
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.controller.js.map