import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0 },
    points: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
