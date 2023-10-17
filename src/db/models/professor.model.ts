import { Schema, model } from "mongoose"
import { IProfessor } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const ProfessorSchema = new Schema<IProfessor>(
  {
    ...UserSchema,
    subjects: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { _id: false }
)

parseModelToJSON(ProfessorSchema)

const Professor = model<IProfessor>("Professor", ProfessorSchema)

export default Professor
