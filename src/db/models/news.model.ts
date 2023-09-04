import { Model, Schema, model } from "mongoose"
import { INews } from "../../interfaces/news.interface"
import { parseModelToJSON } from "../../utils/parse-model-to-json.utilts"

const NewsSchema = new Schema<INews>({
  description: {
    type: String,
    default: "Sin descripcion",
  },
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
    default: new Date().toISOString(),
  },
  // TODO: Add in V2
  // authorId: {
  //   type: Types.ObjectId,
  //   ref: 'Admin'
  // }
})

parseModelToJSON(NewsSchema)

const News: Model<INews> = model("News", NewsSchema)

export default News
