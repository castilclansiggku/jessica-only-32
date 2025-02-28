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
