import { auth } from "./auth";

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: "Active" | "Inactive";
}

const API_BASE = "/api";

const getAuthHeaders = () => {
  const token = auth.getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  async checkAuth(token: string) {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  async getLeads(statusFilter?: "Active" | "Inactive"): Promise<Lead[]> {
    const url = statusFilter
      ? `${API_BASE}/leads?status=${statusFilter}`
      : `${API_BASE}/leads`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }

    const data = await response.json();
    return data.leads || [];
  },

  async createLead(lead: Omit<Lead, "id">): Promise<Lead> {
    const response = await fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create lead");
    }

    const data = await response.json();
    return data.lead;
  },

  async updateLead(id: number, lead: Omit<Lead, "id">): Promise<Lead> {
    const response = await fetch(`${API_BASE}/leads/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update lead");
    }

    const data = await response.json();
    return data.lead;
  },
};
