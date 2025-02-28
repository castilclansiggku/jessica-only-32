const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

function shortenURL() {
    const urlInput = document.getElementById("urlInput").value;
    const shortId = generateShortId();
    const shortUrl = `https://usalink.netlify.app/${shortId}`;

    firebase.database().ref('urls/' + shortId).set({
        originalUrl: urlInput
    });

    document.getElementById("shortenedURL").textContent = shortUrl;
}

function generateShortId() {
    return Math.random().toString(36).substring(2, 8); // Generate a random short ID
}
