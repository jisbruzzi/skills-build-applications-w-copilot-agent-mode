import mongoose, { type Document } from 'mongoose';
export interface ILeaderboardEntry extends Document {
    userId: mongoose.Types.ObjectId;
    userName: string;
    score: number;
    rank: number;
    lastUpdated: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ILeaderboardEntry, {}, {}, {}, Document<unknown, {}, ILeaderboardEntry, {}, mongoose.DefaultSchemaOptions> & ILeaderboardEntry & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboardEntry>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map