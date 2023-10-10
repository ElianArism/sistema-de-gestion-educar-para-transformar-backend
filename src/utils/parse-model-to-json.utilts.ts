import type { Schema } from "mongoose"

export const parseModelToJSON = (schema: Schema): void => {
  schema.method("toJSON", function () {
    const { __v, ...object } = this.toObject()
    if (object?._id && object.id) delete object._id
    if (object?.password) delete object.password
    return object
  })
}
