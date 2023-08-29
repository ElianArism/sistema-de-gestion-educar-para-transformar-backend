"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModelToJSON = void 0;
const parseModelToJSON = (schema) => {
    schema.method("toJSON", function () {
        const { __v, ...object } = this.toObject();
        if (object?.password)
            delete object.password;
        return object;
    });
};
exports.parseModelToJSON = parseModelToJSON;
//# sourceMappingURL=parse-model-to-json.utilts.js.map