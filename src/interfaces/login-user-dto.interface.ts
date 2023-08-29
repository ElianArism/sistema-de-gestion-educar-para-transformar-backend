import { AvailableRoles } from "../enums/roles.enum"
export interface LoginUserDTO {
  id: string
  password: string
  role: AvailableRoles
}
