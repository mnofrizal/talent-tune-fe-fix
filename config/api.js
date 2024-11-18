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
    LIST_BY_USER: (id) => `${API_BASE_URL}/assessments/participant/${id}`,
    LIST_BY_EVALUATOR: (id) => `${API_BASE_URL}/assessments/evaluator/${id}`,
    DETAIL: (id) => `${API_BASE_URL}/assessments/${id}`,
    SEND_INVITATIONMAIL: (id) =>
      `${API_BASE_URL}/assessments/${id}/send-invitation`,
    REQUIREMENT_SUBMIT: (id) => `${API_BASE_URL}/assessments/${id}/requirement`,
    START_ASSESSMENT: (id) => `${API_BASE_URL}/assessments/${id}/start`,
  },
};
