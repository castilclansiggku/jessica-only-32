const fs = require("fs");
const path = require("path");

const filePath = "/tmp/urls.json"; // Direktori sementara untuk menyimpan data

// Buat file urls.json jika belum ada
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}), "utf-8");
}

exports.handler = async (event) => {
    try {
        // Pastikan file ada sebelum membaca
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify({}), "utf-8");
        }

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // **1. HANDLE REDIRECT DARI SHORTLINK**
        if (event.httpMethod === "GET") {
            const id = event.queryStringParameters.id;

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

        // **2. HANDLE PENYIMPANAN SHORTLINK**
        if (event.httpMethod === "POST") {
            const body = JSON.parse(event.body);
            data[body.id] = body.url;

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Shortlink berhasil disimpan!" })
            };
        }

        return { statusCode: 405, body: "Method Not Allowed" };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Server Error: ${error.message}`
        };
    }
};
