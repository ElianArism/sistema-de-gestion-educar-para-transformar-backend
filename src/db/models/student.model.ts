import { Schema, model } from "mongoose"
import { IStudent } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const StudentSchema = new Schema<IStudent>(
  {
    ...UserSchema,
    subjects: [
      {
        type: String,
        default: [],
      },
    ],
    fees: [
      new Schema({
        expireDate: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        isPaid: {
          type: Boolean,
          default: false,
        },
        paymentDate: {
          type: String,
        },
      }),
    ],
  },
  { _id: false }
)

parseModelToJSON(StudentSchema)

const Student = model<IStudent>("Student", StudentSchema)

export default Student
