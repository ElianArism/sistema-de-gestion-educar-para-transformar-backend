import { Schema, model } from "mongoose"
import { IParent } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const ParentSchema = new Schema<IParent>(
  {
    ...UserSchema,
    son: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
  }
)

parseModelToJSON(ParentSchema)

const Parent = model<IParent>("Parent", ParentSchema)

export default Parent
