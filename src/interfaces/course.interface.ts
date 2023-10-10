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
  students: ObjectId[] | IStudent[]
  professor: ObjectId | IProfessor
}
