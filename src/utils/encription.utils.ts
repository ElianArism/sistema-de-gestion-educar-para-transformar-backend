import * as bcrypt from "bcrypt"

export const encrypt = (field: string): string => {
  return bcrypt.hashSync(field, 10)
}

export const isEqualToEcryptedField = (
  field: string,
  encryptedField: string
): boolean => {
  return bcrypt.compareSync(field, encryptedField)
}
