export const setCookie = (res, name, value, maxAge) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // More flexible in development
    maxAge,
  });
};

export const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // More flexible in development
    maxAge: 0,
  });
};
