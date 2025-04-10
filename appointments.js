document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".booking-form");
    const appointmentsContainer = document.querySelector(".appointments-container");

    let bookedAppointments = []; // Store booked appointments

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh

        // Get form values
        const doctorName = document.getElementById("doctor-name").value.trim();
        const patientName = document.getElementById("patient-name").value.trim();
        const appointmentType = document.getElementById("appointment-type").value;
        const appointmentDate = document.getElementById("appointment-date").value;
        const appointmentTime = document.getElementById("appointment-time").value;
        
        const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        const currentTime = new Date();

        // Validation: Ensure all fields are filled
        if (!doctorName || !patientName || !appointmentDate || !appointmentTime) {
            alert("Please fill in all fields!");
            return;
        }

        // Appointment time restrictions
        if (appointmentType === "Emergency") {
            let minEmergencyTime = new Date(currentTime.getTime() + 10 * 60000); // 10 mins later
            if (selectedDateTime < minEmergencyTime) {
                alert("Emergency appointments must be at least 10 minutes from now.");
                return;
            }
        } else {
            let minRegularTime = new Date(currentTime.getTime() + 12 * 60 * 60000); // 12 hours later
            if (selectedDateTime < minRegularTime) {
                alert("Regular appointments must be at least 12 hours in advance.");
                return;
            }
        }

        // Check for duplicate appointments
        const appointmentKey = `${appointmentDate} ${appointmentTime}`;
        if (bookedAppointments.includes(appointmentKey)) {
            alert("This time slot is already booked. Choose another time.");
            return;
        }

        // Store the appointment (Prevent duplicates for non-emergency)
        if (appointmentType !== "Emergency") {
            bookedAppointments.push(appointmentKey);
        }

        // ✅ Declare appointmentCard **before using it**
        let appointmentCard = document.createElement("div");
        appointmentCard.classList.add("appointment-card");

        if (appointmentType === "Emergency") {
            appointmentCard.classList.add("emergency"); // Apply emergency styles
        }

        appointmentCard.innerHTML = `
            <p><strong>Doctor:</strong> ${doctorName}</p>
            <p><strong>Patient:</strong> ${patientName}</p>
            <p><strong>Type:</strong> ${appointmentType}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
        `;

        // Append new appointment to the list
        appointmentsContainer.appendChild(appointmentCard);

        // Clear form fields after booking
        form.reset();
    });
});

// Logout Function
function logout() {
    alert("Logging out...");
    window.location.href = "../login.html"; // Redirect to login page
}
