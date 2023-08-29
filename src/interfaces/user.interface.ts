import { AvailableRoles } from "../enums/roles.enum"

export interface IUser {
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
}

export interface IParent extends IUser {
  son: IStudent
}
