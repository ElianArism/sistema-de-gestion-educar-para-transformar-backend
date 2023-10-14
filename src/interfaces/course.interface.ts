import { ObjectId } from "mongoose"
import { IProfessor, IStudent } from "./user.interface"

export interface ICourse {
  name: string
  year: string
  scheduleDetails: {
    day: string
    startTime: string
    endTime: string
  }[]
  students: {
    studentInfo: ObjectId | IStudent
    schoolGrades: {
      firstTrimester: number
      secondTrimester: number
      thirdTrimester: number
      finalGrade: number
      firstDoOver: number
      secondDoOver: number
      thirdDoOver: number
    }
  }[]
  professor: ObjectId | IProfessor
}
