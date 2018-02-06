import mongoose from 'mongoose'
const Schema = mongoose.Schema

const facebookCommentSchema = new Schema({
  id: String,
  from: String,
  message: String,
  // like_count: String,
  created_time: Date
})
export const FacebookComment = mongoose.model(
  "FacebookComment",
  facebookCommentSchema
)

const facebookPostSchema = new Schema({
  id: String,
  from: String,
  message: String,
  // like_count: String,
  created_time: Date
})
export const FacebookPost = mongoose.model(
  'FacebookPost',
  facebookPostSchema
)