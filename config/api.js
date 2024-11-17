export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    DETAIL: (id) => `${API_BASE_URL}/users/${id}`,
  },
  ASSESSMENTS: {
    LIST: `${API_BASE_URL}/assessments`,
    DETAIL: (id) => `${API_BASE_URL}/assessments/${id}`,
  },
};
