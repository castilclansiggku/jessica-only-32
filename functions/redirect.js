const urls = {
  "iejwrc": "https://google.com", // Gantilah dengan database URL pendek yang kamu buat
  "abc123": "https://youtube.com"
};

exports.handler = async (event) => {
  const slug = event.path.replace("/", ""); // Ambil slug dari URL pendek
  const destination = urls[slug]; // Cek apakah slug ada di database

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
