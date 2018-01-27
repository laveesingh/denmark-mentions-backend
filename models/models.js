import mongoose from 'mongoose'
const Schema = mongoose.Schema

const facebookCommentSchema = new Schema({
  id: string,
  from: string,
  message: string,
  like_count: string,
  created_time: Date
})
export const FacebookComment = mongoose.model(
  "FacebookComment",
  facebookCommentSchema
)