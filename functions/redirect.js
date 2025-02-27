const crypto = require("crypto");

const DEFAULT_URL = "https://example.com"; // URL utama jika slug tidak cocok

exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", ""));

  // Contoh daftar URL asli yang ingin didukung (bisa diambil dari mana saja)
  const originalUrls = [
    "https://google.com",
    "https://github.com",
    "https://netlify.com"
  ];

  // Cek apakah slug cocok dengan hash URL asli
  for (const url of originalUrls) {
    const hash = crypto.createHash("md5").update(url).digest("hex").slice(0, 6);
    if (hash === slug) {
      return {
        statusCode: 301,
        headers: { Location: url },
        body: `Redirecting to ${url}...`,
      };
    }
  }

  // Jika tidak cocok, redirect ke DEFAULT_URL
  return {
    statusCode: 301,
    headers: { Location: DEFAULT_URL },
    body: `Redirecting to ${DEFAULT_URL}...`,
  };
};
