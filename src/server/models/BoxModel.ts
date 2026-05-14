import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const boxSchema = new Schema({
  name: String,
  sequence: { type: Number, default: 0 },
  slots: [
    {
      pill: {
        name: { type: String, required: true },
        brand: String,
        remark: String,
        amount: { type: Number, min: 0 },
        shelfLife: String,
        _id: false,
      },
      alarm: [
        {
          time: { type: String, required: true },
          period: [Number],
          amount: { type: Number, required: true, min: 1 },
          enabled: { type: Boolean, default: false },
          _id: false,
        },
      ],
      _id: false,
    },
  ],
  electricity: Number,
  settings: { type: Object, _id: false },
  position: {
    lng: Number,
    lat: Number,
  },
  steps: { type: Number, default: 0, min: 0 },
});

type BoxDocument = InferSchemaType<typeof boxSchema>;
const Box = (models.Box as Model<BoxDocument>) || model<BoxDocument>("Box", boxSchema);

export default Box;
