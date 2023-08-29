"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    get() {
        return this.model.find();
    }
    getById(id) {
        return this.model.findOne({ id });
    }
    delete(id) {
        return this.model.findOneAndDelete({ id }, { new: true });
    }
    updatePassword(id, password) {
        return this.model.findOneAndUpdate({ id }, { password });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map