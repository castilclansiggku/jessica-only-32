const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", "")); // Ambil slug dari URL pendek

  // Pastikan path file JSON benar
  const filePath = path.resolve(__dirname, "urls.json");

  // Cek apakah file ada sebelum membacanya
  if (!fs.existsSync(filePath)) {
    return {
      statusCode: 500,
      body: "Error: urls.json not found!"
    };
  }

  // Baca file JSON
  const data = fs.readFileSync(filePath, "utf8");
  const urlDatabase = JSON.parse(data);

  // Jika slug ada dalam database, redirect ke URL yang tersimpan
  if (urlDatabase[slug]) {
    return {
      statusCode: 301,
      headers: { Location: urlDatabase[slug] },
      body: `Redirecting to ${urlDatabase[slug]}...`
    };
  }

  // Jika slug tidak ada di database, cek apakah slug adalah URL asli
  if (slug.startsWith("http://") || slug.startsWith("https://")) {
    return {
      statusCode: 301,
      headers: { Location: slug },
      body: `Redirecting to ${slug}...`
    };
  }

  // Jika slug tidak ditemukan dan bukan URL valid, tampilkan error
  return {
    statusCode: 404,
    body: "Short URL not found or invalid URL format."
  };
};
