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
      _id: false,
      type: {
        studentInfo: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        schoolGrades: {
          _id: false,
          type: {
            firstTrimester: {
              type: Number,
            },
            secondTrimester: {
              type: Number,
            },
            thirdTrimester: {
              type: Number,
            },
            finalGrade: {
              type: Number,
            },
            firstDoOver: {
              type: Number,
            },
            secondDoOver: {
              type: Number,
            },
            thirdDoOver: {
              type: Number,
            },
          },
        },
      },
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
