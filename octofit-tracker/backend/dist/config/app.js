"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// Backend configuration
exports.config = {
    PORT: 8000,
    MONGODB_URI: 'mongodb://localhost:27017/octofit',
    NODE_ENV: process.env.NODE_ENV || 'development',
};
exports.default = exports.config;
//# sourceMappingURL=app.js.map