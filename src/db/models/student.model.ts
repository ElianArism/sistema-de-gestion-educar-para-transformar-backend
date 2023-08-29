import { Schema, model } from "mongoose"
import { IStudent } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const StudentSchema = new Schema<IStudent>({
  ...UserSchema,
  subjects: [
    {
      type: String,
      default: [],
    },
  ],
})

parseModelToJSON(StudentSchema)

const Student = model<IStudent>("Student", StudentSchema)

export default Student
