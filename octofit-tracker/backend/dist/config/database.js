"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose_1.default.connection;
mongoose_1.default
    .connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error.message || error);
});
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
exports.default = db;
//# sourceMappingURL=database.js.map