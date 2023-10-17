import { Schema, model } from "mongoose"
import { IParent } from "../../interfaces/user.interface"
import UserSchema from "./user.model"

const ParentSchema = new Schema<IParent>(
  {
    ...UserSchema,
    son: {
      type: Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
  },
  { _id: false }
)

const Parent = model<IParent>("Parent", ParentSchema)

export default Parent
