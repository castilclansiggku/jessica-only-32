const urlDatabase = {
  "iejwrc": "https://google.com",
  "abc123": "https://youtube.com"
};

exports.handler = async (event) => {
  const path = event.path.replace("/", ""); // Ambil slug dari URL pendek
  const destination = urlDatabase[path]; // Cek apakah slug ada di database

  if (destination) {
    return {
      statusCode: 301,
      headers: { Location: destination },
      body: `Redirecting to ${destination}...`
    };
  } else {
    return {
      statusCode: 404,
      body: "Short URL not found"
    };
  }
};
