import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: "Active" | "Inactive";
}

type Data = {
  leads?: Lead[];
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
  if (req.method === "GET") {
    const leads = readLeads();
    const statusFilter = req.query.status as string | undefined;

    let filteredLeads = leads;
    if (statusFilter && (statusFilter === "Active" || statusFilter === "Inactive")) {
      filteredLeads = leads.filter((lead) => lead.status === statusFilter);
    }

    return res.status(200).json({ leads: filteredLeads });
  }

  if (req.method === "POST") {
    const { name, company, email, status } = req.body;

    if (!name || !company || !email || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (status !== "Active" && status !== "Inactive") {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const leads = readLeads();
    const newId = Math.max(...leads.map((l) => l.id), 0) + 1;
    const newLead: Lead = {
      id: newId,
      name,
      company,
      email,
      status,
    };

    leads.push(newLead);
    writeLeads(leads);

    return res.status(201).json({ lead: newLead });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
