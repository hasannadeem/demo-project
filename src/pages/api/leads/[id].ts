import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Lead } from "./index";

type Data = {
  lead?: Lead;
  message?: string;
};

const getLeadsFilePath = () => {
  return path.join(process.cwd(), "data", "leads.json");
};

const readLeads = (): Lead[] => {
  const filePath = getLeadsFilePath();
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const writeLeads = (leads: Lead[]) => {
  const filePath = getLeadsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, company, email, status } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid lead ID" });
    }

    if (!name || !company || !email || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (status !== "Active" && status !== "Inactive") {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const leads = readLeads();
    const leadIndex = leads.findIndex((l) => l.id === Number(id));

    if (leadIndex === -1) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const updatedLead: Lead = {
      id: Number(id),
      name,
      company,
      email,
      status,
    };

    leads[leadIndex] = updatedLead;
    writeLeads(leads);

    return res.status(200).json({ lead: updatedLead });
  }

  res.setHeader("Allow", ["PUT"]);
  return res.status(405).json({ message: "Method not allowed" });
}
