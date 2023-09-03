import { Types } from "mongoose"

export interface ISubject {
  id: Types.ObjectId
  professor: string
  name: string
  students: Types.ObjectId[]
  schedules: string[]
}
