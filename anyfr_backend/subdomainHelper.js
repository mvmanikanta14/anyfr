const getSubdomain = (req) => {
  const host = req.get("host"); // Extract full host from request header
  if (!host) return "localhost:3000"; // Default if no host found

  // ✅ If localhost, return "localhost:3000"
  if (host.includes("localhost")) {
      return "localhost:3000";
  }

  // ✅ For domains like `test.mydomain.com` or `test5.mydomain.com`, extract subdomain part
  const parts = host.split(".");
  if (parts.length >= 3) {
      return parts[0]; // Extract only the subdomain (e.g., "test", "test5")
  }

  return "unknown"; // Fallback case (should never occur if properly configured) madhukant
};

module.exports = { getSubdomain };
