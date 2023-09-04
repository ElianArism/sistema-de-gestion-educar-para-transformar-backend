import { Model, Schema, model } from "mongoose"
import { ISubject } from "../../interfaces/subject.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"

const SubjectSchema = new Schema<ISubject>({
  professor: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  students: {
    type: [
      {
        type: Schema.Types.ObjectId,
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
