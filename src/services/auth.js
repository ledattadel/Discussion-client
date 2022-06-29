import api from "../api/api";

export const fetchSignin = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response;
};

export const fetchSignup = async ({
  userName,
  gender,
  email,
  password,
  confirmPassword,
}) => {
  const response = await api.post("/auth/register", {
    userName,
    gender,
    email,
    password,
    confirmPassword,
  });
  return response;
};

export const fetchSendResetPassword = async (email) => {
  const response = await api.post("/auth/send-password-reset", email);
  return response;
};

export const fetchChangePassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response;
};

export const fetchVerifyEmailAccount = async (data) => {
  const response = await api.post("/auth/verify-email", data);
  return response;
};

export const fetchRefreshToken = async (data) => {
  const response = await api.post("/auth/refresh-token", {
    refreshToken: data,
  });
  return response;
};
