// ✅ Ensure Firebase is loaded before using auth
document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // ✅ Login with email and password
    document.querySelector(".login-btn").addEventListener("click", function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to dashboard
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });

    // ✅ Google Sign-in
    document.querySelector(".google-login").addEventListener("click", function () {
        auth.signInWithPopup(provider)
            .then(result => {
                alert("Google login successful!");
                window.location.href = "index.html"; // Redirect to dashboard
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });
});
