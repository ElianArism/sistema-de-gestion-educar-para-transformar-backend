"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_validation_1 = require("../../middlewares/validations/news.validation");
const news_controller_1 = require("./news.controller");
const NewsRouter = (0, express_1.Router)();
NewsRouter.get("/", [], news_controller_1.getNews);
NewsRouter.get("/:id", [], news_controller_1.getNewsById);
NewsRouter.delete("/:id", [], news_controller_1.deleteNews);
NewsRouter.post("/", news_validation_1.newsValidation, news_controller_1.createNews);
NewsRouter.put("/:id", news_validation_1.newsValidation, news_controller_1.updateNews);
exports.default = NewsRouter;
//# sourceMappingURL=news.routes.js.map