"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.API_BASE_URL = void 0;
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.config = {
    PORT: port,
    API_BASE_URL: exports.API_BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
    NODE_ENV: process.env.NODE_ENV || 'development',
};
exports.default = exports.config;
//# sourceMappingURL=app.js.map