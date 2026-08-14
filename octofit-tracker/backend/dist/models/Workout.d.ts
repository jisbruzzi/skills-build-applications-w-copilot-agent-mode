import mongoose, { type Document } from 'mongoose';
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
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map