const rateLimit = require("express-rate-limit");

const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,                // 20 deletion requests
  message: {
    success: false,
    message: "Too many deletion attempts. Please try again later.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = { deleteLimiter };