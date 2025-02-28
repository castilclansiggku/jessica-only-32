
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQhyhUOeqKcF8-6jb1U8xK12n0VymOptI",
  authDomain: "linkkuu.firebaseapp.com",
  databaseURL: "https://linkkuu-default-rtdb.firebaseio.com",
  projectId: "linkkuu",
  storageBucket: "linkkuu.firebasestorage.app",
  messagingSenderId: "630396087951",
  appId: "1:630396087951:web:73c2b84dc7c610d797cafa"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Function to shorten URL
function shortenURL() {
    console.log("Tombol diklik");
    const urlInput = document.getElementById("urlInput").value;
    const shortId = generateShortId();
    
    // Save the URL to Firebase with the generated shortId
    firebase.database().ref('urls/' + shortId).set({
        originalUrl: urlInput
    });

    // Display the shortened URL
    const shortUrl = `https://usalink.netlify.app/${shortId}`;
    document.getElementById("shortenedURL").textContent = shortUrl;
}

// Function to generate random short ID
function generateShortId() {
    return Math.random().toString(36).substring(2, 8); // Generate random short ID
}

function shortenCustomURL() {
    const urlInput = document.getElementById("urlInput").value;
    const customId = document.getElementById("customId").value;
    
    // Periksa jika customId sudah ada di Firebase
    firebase.database().ref('urls/' + customId).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            // ID sudah digunakan
            alert("Short ID sudah digunakan, silakan pilih ID lain.");
        } else {
            // Simpan URL ke Firebase dengan customId
            firebase.database().ref('urls/' + customId).set({
                originalUrl: urlInput
            });

            // Tampilkan short URL
            const shortUrl = `https://usalink.netlify.app/${customId}`;
            document.getElementById("shortenedURL").textContent = shortUrl;
        }
    });
}

