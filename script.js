
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
    const errorMessage = document.getElementById("errorMessage");

    // Validasi input URL
    if (!urlInput) {
        errorMessage.textContent = "URL tidak boleh kosong!";
        return;
    }

    // Cek apakah URL valid menggunakan regex
// Regex untuk memvalidasi URL secara umum
const urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    if (!urlPattern.test(urlInput)) {
        errorMessage.textContent = "URL tidak valid! Pastikan format URL benar.";
        return;
    }

    // Jika validasi berhasil, lanjutkan untuk shorten URL
    errorMessage.textContent = "";  // Kosongkan pesan kesalahan
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

function deleteURL() {
    const shortIdToDelete = document.getElementById("deleteShortId").value;
    const deleteStatus = document.getElementById("deleteStatus");

    if (shortIdToDelete) {
        const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus URL dengan shortId: ${shortIdToDelete}?`);
        
        if (confirmDelete) {
            // Menghapus URL dari Firebase
            firebase.database().ref('urls/' + shortIdToDelete).remove()
            .then(function() {
                deleteStatus.textContent = `URL dengan shortId ${shortIdToDelete} berhasil dihapus.`;
                showAndHideText();
            })
            .catch(function(error) {
                deleteStatus.textContent = "Terjadi kesalahan: " + error.message;
                showAndHideText();
            });
        }
    } else {
        deleteStatus.textContent = "Silakan masukkan shortId yang valid.";
        showAndHideText();
    }
}

function showAndHideText() {
    const textElement = document.getElementById("deleteStatus");

    // Tampilkan kembali teks jika ada peringatan baru
    textElement.style.display = "block";  
    textElement.style.opacity = "1";  

    // Hapus animasi sebelumnya agar bisa muncul lagi dengan mulus
    clearTimeout(textElement.hideTimeout); 

    // Auto-hide setelah 3 detik
    textElement.hideTimeout = setTimeout(() => {
        textElement.style.opacity = "0"; 
        setTimeout(() => {
            textElement.style.display = "none"; 
        }, 1000);
    }, 3000);
}

