import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  boxes: [Schema.Types.ObjectId],
});

type UserDocument = InferSchemaType<typeof userSchema>;
const User = (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);

export default User;
