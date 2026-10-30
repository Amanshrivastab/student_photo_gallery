const rateLimit = require("express-rate-limit");

const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many deletion attempts. Try again later.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = { deleteLimiter };