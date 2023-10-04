import { Types } from "mongoose"
import { AvailableRoles } from "../enums/roles.enum"

export interface IUser extends Document {
  id: string
  name: string
  lastName: string
  password: string
  birthDate: string
  role: AvailableRoles
}

export interface IProfessor extends IUser {
  email: string
  subjects?: string[]
}

export interface IStudent extends IUser {
  subjects?: string[]
  fees: {
    expireDate: string
    value: string
    paymentDate?: string
    isPaid: boolean
  }[]
}

export interface IParent extends IUser {
  son: Types.ObjectId
}
