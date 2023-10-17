import { Schema, model } from "mongoose"
import { IUser } from "../../interfaces/user.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"
import UserSchema from "./user.model"

const AuthoritySchema = new Schema(UserSchema, { _id: false })

parseModelToJSON(AuthoritySchema)

const Authority = model<IUser>("Authority", AuthoritySchema)

export default Authority
