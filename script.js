document.getElementById("shortenForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const longUrl = document.getElementById("longUrl").value;
    const randomKey = Math.random().toString(36).substring(7); // Membuat ID acak
    const shortUrl = window.location.origin + "/" + randomKey;

    // Simpan ke Netlify Functions (JSON file)
    const response = await fetch("/.netlify/functions/redirect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: randomKey, url: longUrl })
    });

    if (response.ok) {
        document.getElementById("shortlinkResult").innerHTML = 
            `Shortlink Anda: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    } else {
        document.getElementById("shortlinkResult").innerHTML = 
            `<span style="color: red;">Gagal membuat shortlink.</span>`;
    }

    document.getElementById("longUrl").value = "";
});
