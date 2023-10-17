import Authority from "../db/models/authority.model"
import Parent from "../db/models/parent.model"
import Personal from "../db/models/personal.model"
import Professor from "../db/models/professor.model"
import Student from "../db/models/student.model"
import { UserRepository } from "../db/repository/user.repository"
import { AvailableRoles } from "../enums/roles.enum"
import {
  IParent,
  IProfessor,
  IStudent,
  IUser,
} from "../interfaces/user.interface"

export const getUserCollectionByRole = (role: AvailableRoles) => {
  if (AvailableRoles.parent === role) {
    return new UserRepository<IParent>(Parent)
  } else if (AvailableRoles.professor === role) {
    return new UserRepository<IProfessor>(Professor)
  } else if (AvailableRoles.student === role) {
    return new UserRepository<IStudent>(Student)
  } else if (AvailableRoles.authority === role) {
    return new UserRepository<IUser>(Authority)
  } else if (AvailableRoles.personal === role) {
    return new UserRepository<IUser>(Personal)
  }
  return null
}
