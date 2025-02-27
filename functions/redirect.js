exports.handler = async (event) => {
  const slug = decodeURIComponent(event.path.replace("/", ""));

  // Jika slug terlihat seperti URL, langsung redirect
  if (slug.match(/^https?:\/\//)) {
    return {
      statusCode: 301,
      headers: { Location: slug },
      body: `Redirecting to ${slug}...`
    };
  }

  return {
    statusCode: 404,
    body: "Short URL not found."
  };
};
