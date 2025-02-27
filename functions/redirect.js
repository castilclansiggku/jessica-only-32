const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "urls.json");

exports.handler = async (event) => {
    // Handle Redirect dari Shortlink
    if (event.httpMethod === "GET") {
        const id = event.queryStringParameters.id;
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (data[id]) {
            return {
                statusCode: 301,
                headers: { "Location": data[id] },
                body: "Redirecting..."
            };
        } else {
            return {
                statusCode: 404,
                body: "Shortlink tidak ditemukan."
            };
        }
    }

    // Handle Simpan Shortlink
    if (event.httpMethod === "POST") {
        const body = JSON.parse(event.body);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        data[body.id] = body.url;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Shortlink berhasil disimpan!" })
        };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
