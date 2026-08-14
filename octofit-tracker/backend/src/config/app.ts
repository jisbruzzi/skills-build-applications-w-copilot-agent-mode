// Backend configuration
export const config = {
  PORT: 8000,
  MONGODB_URI: 'mongodb://localhost:27017/octofit',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
