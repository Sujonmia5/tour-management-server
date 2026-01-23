const JWT_ACCESS_SECRET =
  process.env["JWT_ACCESS_SECRET"] || "default_access_secret";
const JWT_REFRESH_SECRET =
  process.env["JWT_REFRESH_SECRET"] || "default_refresh_secret";
const JWT_ACCESS_EXPIRES_IN = process.env["JWT_ACCESS_EXPIRES_IN"] || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env["JWT_REFRESH_EXPIRES_IN"] || "7d";

export {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
};
