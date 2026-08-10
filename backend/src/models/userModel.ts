
import { Schema, Document, model, Types } from "mongoose";                                                                                                                                                                                                                                  

export interface IUser extends Document {
  nickName: string;
  eMail: string;
  password: string;
  savedSongs: Types.ObjectId[];
  createDate: Date;
}

const UserSchema = new Schema<IUser>({
  nickName: { type: String, required: true, trim: true },
  eMail: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  savedSongs: [{ type: Schema.Types.ObjectId, ref: "Song", default: [] }],
  createDate: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", UserSchema);
