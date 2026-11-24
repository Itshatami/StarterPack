import { Schema, model } from "mongoose";

const OptionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["number", "string", "array", "boolean"],
      required: true,
    },
    enum: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    guid: {
      type: String,
      default: null,
      trim: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

OptionSchema.index({ category: 1, key: 1 }, { unique: true });

const OptionModel = model("Option", OptionSchema);

export default OptionModel;
