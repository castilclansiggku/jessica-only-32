const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", ""));

  // Ambil path file JSON secara absolut
  const filePath = path.resolve(__dirname, "urls.json");

  try {
    // Baca file JSON
    const data = fs.readFileSync(filePath, "utf8");
    const urlDatabase = JSON.parse(data);

    if (urlDatabase[slug]) {
      return {
        statusCode: 301,
        headers: { Location: urlDatabase[slug] },
        body: `Redirecting to ${urlDatabase[slug]}...`
      };
    }

    if (slug.startsWith("http://") || slug.startsWith("https://")) {
      return {
        statusCode: 301,
        headers: { Location: slug },
        body: `Redirecting to ${slug}...`
      };
    }

    return {
      statusCode: 404,
      body: "Short URL not found or invalid URL format."
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error reading urls.json: ${error.message}`
    };
  }
};
