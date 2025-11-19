import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  authenticated?: boolean;
  user?: {
    email: string;
  };
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ authenticated: false, message: "No token provided" });
    }

    // In a real app, you'd verify the JWT token
    // For this demo, we'll just check if a token exists
    try {
      const decoded = Buffer.from(token, "base64").toString("utf8");
      const [email] = decoded.split(":");

      if (email) {
        return res.status(200).json({
          authenticated: true,
          user: { email },
        });
      }
    } catch (error) {
      // Invalid token
    }

    return res.status(401).json({ authenticated: false, message: "Invalid token" });
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: "Method not allowed" });
}
