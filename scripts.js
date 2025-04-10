// ✅ Firebase configuration
const firebaseConfig = {
    
};

// ✅ Initialize Firebase (Prevent re-initialization)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

// ✅ Arrays to Store Last 14 Readings
let timeLabels = [];
let bed1HeartData = [];
let bed1OxygenData = [];
let bed2HeartData = [];
let bed2OxygenData = [];

// ✅ Create Chart Function
const createChart = (ctx, title, color1, color2) => {
    return new Chart(ctx, {
        type: "line",
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: "Heart Rate (BPM)",
                    data: [],
                    borderColor: color1,
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: "Oxygen Level (%)",
                    data: [],
                    borderColor: color2,
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "Time" } },
                y: { title: { display: true, text: title }, min: 50, max: 150 }
            }
        }
    });
};

// ✅ Create Charts for Bed 1 & Bed 2
const bed1Chart = createChart(document.getElementById("bed1Chart").getContext("2d"), "Bed 1 Readings", "red", "blue");
const bed2Chart = createChart(document.getElementById("bed2Chart").getContext("2d"), "Bed 2 Readings", "green", "purple");

// ✅ Fetch Real-time Data from Firebase & Update Charts
const patientsRef = database.ref("patients");

patientsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        let timestamp = new Date().toLocaleTimeString(); // Get Current Time

        let heart1 = data.bed1?.heartRate ?? null;
        let oxygen1 = data.bed1?.oxygenLevel ?? null;
        let heart2 = data.bed2?.heartRate ?? null;
        let oxygen2 = data.bed2?.oxygenLevel ?? null;

        // ✅ Maintain Only Last 14 Readings
        if (timeLabels.length >= 14) {
            timeLabels.shift();
            bed1HeartData.shift();
            bed1OxygenData.shift();
            bed2HeartData.shift();
            bed2OxygenData.shift();
        }

        // ✅ Add New Data if Available
        if (heart1 !== null && oxygen1 !== null) {
            timeLabels.push(timestamp);
            bed1HeartData.push(heart1);
            bed1OxygenData.push(oxygen1);
        }
        if (heart2 !== null && oxygen2 !== null) {
            bed2HeartData.push(heart2);
            bed2OxygenData.push(oxygen2);
        }

        // ✅ Update Chart Data
        bed1Chart.data.labels = timeLabels;
        bed1Chart.data.datasets[0].data = bed1HeartData;
        bed1Chart.data.datasets[1].data = bed1OxygenData;
        bed1Chart.update();

        bed2Chart.data.labels = timeLabels;
        bed2Chart.data.datasets[0].data = bed2HeartData;
        bed2Chart.data.datasets[1].data = bed2OxygenData;
        bed2Chart.update();
    }
});

// ✅ Run everything after the page loads
window.onload = function () {
    console.log("Page Loaded ✅");

    // ✅ Live Patient Monitoring: Load Real-Time Data
    if (document.getElementById("bed1-heartRate") && document.getElementById("bed2-heartRate")) {
        console.log("Listening for patient data...");
        const patientsRef = database.ref("patients");

        patientsRef.on("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById("bed1-heartRate").innerText = data.bed1.heartRate + " bpm" || "-- bpm";
                document.getElementById("bed1-oxygen").innerText = data.bed1.oxygenLevel + "%" || "--%";

                document.getElementById("bed2-heartRate").innerText = data.bed2.heartRate + " bpm" || "-- bpm";
                document.getElementById("bed2-oxygen").innerText = data.bed2.oxygenLevel + "%" || "--%";
            }
        });
    } else {
        console.error("⚠️ Dashboard elements not found!");
    }

    // ✅ Doctor Phonebook: Load Doctors
    if (document.getElementById("doctorList")) {
        console.log("Loading doctors...");
        let doctorList = document.getElementById("doctorList");
        doctors.forEach(doctor => {
            let doctorCard = `
                <div class="doctor-card" onclick="showDoctorDetails('${doctor.name}', '${doctor.specialization}', '${doctor.phone}', '${doctor.email}')">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialization}</p>
                </div>
            `;
            doctorList.innerHTML += doctorCard;
        });
    } else {
        console.error("⚠️ Doctor list container not found!");
    }
};

// ✅ Doctor Phonebook Data
const doctors = [
     // get the doctors list from fire base
];

// ✅ Show Doctor Details in Modal
function showDoctorDetails(name, specialization, phone, email) {
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalSpecialization").innerText = specialization;
    document.getElementById("modalPhone").innerText = phone;
    document.getElementById("modalPhone").href = "tel:" + phone;
    document.getElementById("modalEmail").innerText = email;
    document.getElementById("modalEmail").href = "mailto:" + email;
    document.getElementById("doctorModal").style.display = "block";
}

// ✅ Close Modal
function closeModal() {
    document.getElementById("doctorModal").style.display = "none";
}

// ✅ Logout Function
function logout() {
    alert("Logging out...");
    window.location.href = "login.html";
}
