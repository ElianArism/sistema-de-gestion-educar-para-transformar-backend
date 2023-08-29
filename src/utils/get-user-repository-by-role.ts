import Parent from "../db/models/parent.model"
import Professor from "../db/models/professor.model"
import Student from "../db/models/student.model"
import { UserRepository } from "../db/repository/user.repository"
import { AvailableRoles } from "../enums/roles.enum"
import { IParent, IProfessor, IStudent } from "../interfaces/user.interface"

export const getUserCollectionByRole = (role: AvailableRoles) => {
  if (AvailableRoles.parent === role) {
    return new UserRepository<IParent>(Parent)
  } else if (AvailableRoles.professor === role) {
    return new UserRepository<IProfessor>(Professor)
  } else if (AvailableRoles.student === role) {
    return new UserRepository<IStudent>(Student)
  }
  return null
}
