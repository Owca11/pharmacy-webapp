import { DrugDto } from "../src/components/types";

const API_BASE_URL = "http://localhost:8080/api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

/**
 * Authenticates a user with provided credentials.
 * @param credentials - User's username and password.
 * @returns A promise that resolves to a LoginResponse containing the auth token.
 */
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

/**
 * Retrieves the authentication token from local storage.
 * @returns The authentication token or null if not found.
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Checks if the user is authenticated.
 * @returns True if an authentication token exists, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * Removes the authentication token from local storage, effectively logging out the user.
 */
export const logout = (): void => {
  localStorage.removeItem("authToken");
};

/**
 * Fetches all available drugs from the API.
 * @returns A promise that resolves to an array of DrugDto objects.
 */
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

/**
 * Fetches a single drug by its ID from the API.
 * @param id - The ID of the drug to fetch.
 * @returns A promise that resolves to a DrugDto object.
 */
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
