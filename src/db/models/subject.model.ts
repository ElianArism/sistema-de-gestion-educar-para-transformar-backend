import { Model, Schema, Types, model } from "mongoose"
import { ISubject } from "../../interfaces/subject.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"

const SubjectSchema = new Schema<ISubject>({
  professor: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  students: {
    type: [
      {
        type: Types.ObjectId,
      },
    ],
    default: [],
  },
  schedules: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
})

parseModelToJSON(SubjectSchema)

const Subject: Model<ISubject> = model("Subject", SubjectSchema)

export default Subject
