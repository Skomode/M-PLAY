import { Schema, Document, model, Types, SchemaTypes } from "mongoose";
import { Comment } from "./commentModel";

interface ISong extends Document {
  uploadedBy: Types.ObjectId;
  title: string;
  duration: number;
  like: Types.ObjectId[];
  views: Types.ObjectId[];
  pictureUrl: string;
  audioUrl: string;
  createDate: Date;
}

const songSchema = new Schema<ISong>({
  uploadedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  like: [{ type: SchemaTypes.ObjectId, ref: "User", default: [] }],
  views: [{ type: SchemaTypes.ObjectId, ref: "User", default: [] }],
  pictureUrl: { type: String },
  audioUrl: { type: String },
  createDate: { type: Date, default: Date.now },
});

songSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({ songId: doc._id });
  }
});

export const Song = model<ISong>("Song", songSchema);
