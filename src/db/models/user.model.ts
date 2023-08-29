import { Schema } from "mongoose"
import { IUser } from "../../interfaces/user.interface"

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      auto: false,
    },
    birthDate: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
)

export default UserSchema
