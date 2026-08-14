import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  focus: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    equipment: [{ type: String }],
    focus: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
