const UserSchema = {
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
  password: {
    type: String,
    required: true,
  },
}

export default UserSchema
