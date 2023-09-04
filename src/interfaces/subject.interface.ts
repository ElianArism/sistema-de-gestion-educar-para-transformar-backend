import { Types } from "mongoose"

export interface ISubject {
  id: Types.ObjectId
  professor: Types.ObjectId
  name: string
  students: Types.ObjectId[]
  schedules: string[]
}
