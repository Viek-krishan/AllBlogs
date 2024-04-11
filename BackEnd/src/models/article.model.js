import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const articleSchema = new Schema(
  {
    thumbnail: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summery: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User must be entered"],
    },
  },
  { timestamps: true }
);

articleSchema.plugin(mongooseAggregatePaginate);

export const Article = mongoose.model("Article", articleSchema);
