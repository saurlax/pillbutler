import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const pillSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  remark: String,
  price: Number,
});

type PillDocument = InferSchemaType<typeof pillSchema>;
const Pill = (models.Pill as Model<PillDocument>) || model<PillDocument>("Pill", pillSchema);

export default Pill;
