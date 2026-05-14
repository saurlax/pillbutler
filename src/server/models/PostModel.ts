import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

type PostDocument = InferSchemaType<typeof postSchema>;
const Post = (models.Post as Model<PostDocument>) || model<PostDocument>("Post", postSchema);

export default Post;
