import { Schema, model } from "mongoose"
import { IUser } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const PersonalSchema = new Schema(UserSchema, { _id: false })

parseModelToJSON(PersonalSchema)

const Personal = model<IUser>("Personal", PersonalSchema)

export default Personal
