import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success?: boolean;
  token?: string;
  message?: string;
};

// Hardcoded user credentials
const HARDCODED_USER = {
  email: "admin@leadblocks.nl",
  password: "admin123",
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (email === HARDCODED_USER.email && password === HARDCODED_USER.password) {
      // In a real app, you'd generate a proper JWT token
      // For this demo, we'll use a simple token
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

      return res.status(200).json({
        success: true,
        token,
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
