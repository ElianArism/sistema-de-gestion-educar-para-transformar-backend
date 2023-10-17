"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCollectionByRole = void 0;
const authority_model_1 = __importDefault(require("../db/models/authority.model"));
const parent_model_1 = __importDefault(require("../db/models/parent.model"));
const personal_model_1 = __importDefault(require("../db/models/personal.model"));
const professor_model_1 = __importDefault(require("../db/models/professor.model"));
const student_model_1 = __importDefault(require("../db/models/student.model"));
const user_repository_1 = require("../db/repository/user.repository");
const getUserCollectionByRole = (role) => {
    if ("parent" /* AvailableRoles.parent */ === role) {
        return new user_repository_1.UserRepository(parent_model_1.default);
    }
    else if ("professor" /* AvailableRoles.professor */ === role) {
        return new user_repository_1.UserRepository(professor_model_1.default);
    }
    else if ("student" /* AvailableRoles.student */ === role) {
        return new user_repository_1.UserRepository(student_model_1.default);
    }
    else if ("authority" /* AvailableRoles.authority */ === role) {
        return new user_repository_1.UserRepository(authority_model_1.default);
    }
    else if ("personal" /* AvailableRoles.personal */ === role) {
        return new user_repository_1.UserRepository(personal_model_1.default);
    }
    return null;
};
exports.getUserCollectionByRole = getUserCollectionByRole;
//# sourceMappingURL=get-user-repository-by-role.js.map