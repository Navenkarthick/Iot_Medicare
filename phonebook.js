// ✅ Doctor Data with Images
const doctors = [
   // get the doctors list from fire base
];

// ✅ Load Doctors
function loadDoctors() {
    const doctorList = document.getElementById("doctorList");
    doctorList.innerHTML = "";

    doctors.forEach(doctor => {
        doctorList.innerHTML += `
            <div class="doctor-card">
                <div class="top-section">
                    <img src="${doctor.img}" class="doctor-img">
                    <div class="name">${doctor.name}</div>
                    <div class="profession">${doctor.specialization}</div>
                </div>
                <div class="contact-info">
                    <p>📞 <a href="tel:${doctor.phone}" style="color: black;">${doctor.phone}</a></p>
                    <p>📩 <a href="mailto:${doctor.email}" style="color: black;">${doctor.email}</a></p>
                </div>
            </div>
        `;
    });
}

// ✅ Load Doctors on Page Load
window.onload = loadDoctors;

// ✅ Logout Function
function logout() {
    alert("Logging out...");
    window.location.href = "../login.html";
}
