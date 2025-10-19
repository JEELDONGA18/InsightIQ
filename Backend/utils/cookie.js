export const setCookie = (res, name, value, maxAge) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // required for HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // allow cross-site in production
    maxAge,
  });
};

export const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};
