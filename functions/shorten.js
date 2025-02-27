const crypto = require("crypto");

exports.handler = async (event) => {
  const { url } = JSON.parse(event.body || "{}");

  // Validasi URL
  if (!url || !url.match(/^https?:\/\//)) {
    return { statusCode: 400, body: "Invalid URL" };
  }

  // Generate hash pendek dari URL
  const hash = crypto.createHash("md5").update(url).digest("hex").slice(0, 6);

  // Buat URL pendek (gantilah `your-site.netlify.app` dengan domain Netlify-mu)
  const shortUrl = `https://your-site.netlify.app/${hash}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ shortUrl }),
  };
};
