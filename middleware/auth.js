const crypto = require("crypto");
const { getSecretFromDB } = require("../utils/mockDb");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = await getSecretFromDB();

    req.user = { tokenValid: true };

    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
