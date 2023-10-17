import { Types } from "mongoose"

const UserSchema = {
  _id: {
    type: String,
    default: () => new Types.ObjectId(),
  },
  id: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}

export default UserSchema
