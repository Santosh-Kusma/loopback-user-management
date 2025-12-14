export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


// Fail fast
// ✔ No silent security bugs
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
