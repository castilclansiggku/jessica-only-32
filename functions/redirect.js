const fs = require("fs").promises;
const path = require("path");

exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", ""));

  // Coba beberapa kemungkinan lokasi urls.json
  const possiblePaths = [
    path.join(__dirname, "urls.json"),             // Path relatif ke fungsi
    path.join(process.cwd(), "functions/urls.json"), // Path relatif ke root
    path.join(process.cwd(), "urls.json")         // Jika Netlify menyimpan langsung di root
  ];

  let filePath;
  for (const p of possiblePaths) {
    try {
      await fs.access(p); // Cek apakah file ada
      filePath = p;
      break;
    } catch (error) {
      continue;
    }
  }

  if (!filePath) {
    return {
      statusCode: 500,
      body: "Error: urls.json not found!"
    };
  }

  try {
    // Baca file JSON
    const data = await fs.readFile(filePath, "utf8");
    const urlDatabase = JSON.parse(data);

    if (urlDatabase[slug]) {
      return {
        statusCode: 301,
        headers: { Location: urlDatabase[slug] },
        body: `Redirecting to ${urlDatabase[slug]}...`
      };
    }

    return {
      statusCode: 404,
      body: "Short URL not found."
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error reading urls.json: ${error.message}`
    };
  }
};
