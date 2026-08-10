import { Schema, Document, model, Types } from "mongoose";

interface IComment extends Document {
  postedBy: Types.ObjectId;
  songId: Types.ObjectId;
  body: string;
}

const CommentSchema = new Schema<IComment>({
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  songId: { type: Schema.Types.ObjectId, ref: "Song", required: true },
  body: { type: String, required: true, trim: true },
});

export const Comment = model<IComment>("Comment", CommentSchema);
