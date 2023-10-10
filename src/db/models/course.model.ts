import { Schema, model } from "mongoose"
import { ICourse } from "../../interfaces/course.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"

const CourseSchema = new Schema<ICourse>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  year: {
    type: Schema.Types.String,
    required: true,
  },
  scheduleDetails: [
    {
      day: {
        type: Schema.Types.String,
        required: true,
      },
      startTime: {
        type: Schema.Types.String,
        required: true,
      },
      endTime: {
        type: Schema.Types.String,
        required: true,
      },
      _id: false,
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  professor: {
    type: Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
})

parseModelToJSON(CourseSchema)

const Course = model<ICourse>("Course", CourseSchema)

export default Course
