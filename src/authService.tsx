// src/services/authService.ts
import { DrugDto } from "../src/Types";

const API_BASE_URL = "http://localhost:8080/api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const logout = (): void => {
  localStorage.removeItem("authToken");
};

export const fetchAllDrugs = async (): Promise<DrugDto[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/drugs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch drugs");
  }

  return response.json();
};

export const fetchDrugById = async (id: number): Promise<DrugDto> => {
  const response = await fetch(`${API_BASE_URL}/drugs/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch drug with ID ${id}`);
  }

  return response.json();
};
