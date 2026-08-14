import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  teamId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
