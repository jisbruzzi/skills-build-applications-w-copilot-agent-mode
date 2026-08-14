import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  captain: string;
  members: string[];
  sport: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String, required: true }],
    sport: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', teamSchema);
