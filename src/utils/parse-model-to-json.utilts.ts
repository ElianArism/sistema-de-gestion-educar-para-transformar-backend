import type { Schema } from "mongoose"

export const parseModelToJSON = (schema: Schema): void => {
  schema.method("toJSON", function () {
    const { __v, ...object } = this.toObject()
    if (object?.password) delete object.password
    return object
  })
}
