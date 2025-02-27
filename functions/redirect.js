const fs = require("fs");

exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", "")); // Ambil slug dari URL pendek

  // Baca file JSON untuk melihat apakah slug ada dalam database
  const data = fs.readFileSync(__dirname + "/urls.json", "utf8");
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
