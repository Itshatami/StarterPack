import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    parents: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } },
);

CategorySchema.index({ slug: 1 }, { unique: true });

CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
