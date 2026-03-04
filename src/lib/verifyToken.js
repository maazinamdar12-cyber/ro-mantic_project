import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch {
    return null;
  }
}