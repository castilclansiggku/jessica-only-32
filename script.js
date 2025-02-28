// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
