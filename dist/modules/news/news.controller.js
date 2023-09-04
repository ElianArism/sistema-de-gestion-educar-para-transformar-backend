"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsById = exports.getNews = exports.deleteNews = exports.updateNews = exports.createNews = void 0;
const news_model_1 = __importDefault(require("../../db/models/news.model"));
const createNews = async (req, res) => {
    const newsDTO = req.body;
    try {
        const newsDoc = new news_model_1.default(newsDTO);
        await newsDoc.save();
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
exports.createNews = createNews;
const updateNews = async (req, res) => {
    const newsDTO = req.body;
    const newsId = req.params.id;
    if (!newsId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const newsUpdated = await news_model_1.default.findByIdAndUpdate(newsId, newsDTO);
        if (!newsUpdated) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "news does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: {
                id: newsId,
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
exports.updateNews = updateNews;
const deleteNews = async (req, res) => {
    const newsId = req.params.id;
    if (!newsId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const news = await news_model_1.default.findByIdAndDelete(newsId);
        if (!news) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "news does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: news,
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
exports.deleteNews = deleteNews;
const getNews = async (req, res) => {
    try {
        return res.json({
            ok: true,
            data: await news_model_1.default.find(),
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
exports.getNews = getNews;
const getNewsById = async (req, res) => {
    const newsId = req.params.id;
    if (!newsId) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Param :id is required",
            },
        });
    }
    try {
        const news = await news_model_1.default.findById(newsId);
        if (!news) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "news does not exists in DB",
                },
            });
        }
        return res.json({
            ok: true,
            data: news,
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
exports.getNewsById = getNewsById;
//# sourceMappingURL=news.controller.js.map