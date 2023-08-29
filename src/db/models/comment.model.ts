import { Model, Schema, model } from "mongoose"
import { IComment } from "../../interfaces/comment.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"

const commentSchema: Schema<IComment> = new Schema<IComment>({
  description: {
    required: true,
    type: String,
    maxlength: 500,
  },
  rating: {
    type: Number,
    required: false,
  },
  name: {
    required: false,
    type: String,
    maxlength: 50,
  },
  date: {
    required: true,
    type: String,
  },
})

parseModelToJSON(commentSchema)

const Comment: Model<IComment> = model<IComment>("Comment", commentSchema)

export default Comment
