const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

export const config = {
  PORT: port,
  API_BASE_URL,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
