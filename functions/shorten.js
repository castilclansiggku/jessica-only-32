exports.handler = async (event) => {
  const { url } = JSON.parse(event.body);
  if (!url) {
    return { statusCode: 400, body: "URL is required" };
  }

  const slug = Math.random().toString(36).substr(2, 6);
  return {
    statusCode: 200,
    body: JSON.stringify({
      shortUrl: `https://usalink.netlify.app/${slug}`
    })
  };
};
