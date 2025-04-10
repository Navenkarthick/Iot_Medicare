#include <WiFi.h>
#include <FirebaseESP32.h>

// Replace with your credentials
#define WIFI_SSID "YourWiFi"
#define WIFI_PASSWORD "YourPassword"
#define FIREBASE_HOST "https://your-project.firebaseio.com/"
#define FIREBASE_AUTH "your-firebase-auth-key"

FirebaseData firebaseData;

void setup() {
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting...");
    }
    Serial.println("Connected to WiFi");

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
    int heartRate = random(60, 100);  // Simulated sensor data
    int oxygenLevel = random(90, 100);
    
    Firebase.setInt(firebaseData, "/patients/bed1/heartRate", heartRate);
    Firebase.setInt(firebaseData, "/patients/bed1/oxygenLevel", oxygenLevel);
    
    Serial.println("Data sent to Firebase");
    delay(5000);
}
