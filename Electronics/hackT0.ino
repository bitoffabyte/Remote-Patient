#include <DHT.h>       
#define DHTTYPE DHT11  
#include <Wire.h>
#include <MAX30105.h> 
#include <heartRate.h> 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

String serverName = "https://edoctor01.herokuapp.com/";

#define dht_dpin 0
DHT dht(dht_dpin, DHTTYPE); 

MAX30105 particleSensor;

const byte RATE_SIZE = 4; 
byte rates[RATE_SIZE]; 
byte rateSpot = 0;
long lastBeat = 0; 
 
float beatsPerMinute;
int beatAvg;

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;



void setup() 
{
dht.begin();
Serial.begin(9600);
pinMode(14, INPUT); 
pinMode(12, INPUT); 

if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) 
Serial.println("MAX30105 was not found. Please check wiring/power. ");
while (1);

Serial.println("Place your index finger on the sensor with steady pressure.");
 
particleSensor.setup(); 
particleSensor.setPulseAmplitudeRed(0x0A); 
particleSensor.setPulseAmplitudeGreen(0); 


delay(700); 
}

void loop() {
    float t = dht.readTemperature();         
    Serial.print("temperature = ");
    Serial.print(t); 
    Serial.println("C  ");
  delay(800);


float ecg=analogRead(A0);
if((digitalRead(10) == 1)||(digitalRead(11) == 1))
{
Serial.println('!');
}

else
{
Serial.println(analogRead(A0));
}

long irValue = particleSensor.getIR();
 
if (checkForBeat(irValue) == true)
{
long delta = millis() - lastBeat;
lastBeat = millis();
 
beatsPerMinute = 60 / (delta / 1000.0);
 
if (beatsPerMinute < 255 && beatsPerMinute > 20)

{
rates[rateSpot++] = (byte)beatsPerMinute; 
rateSpot %= RATE_SIZE; 
beatAvg = 0;
for (byte x = 0 ; x < RATE_SIZE ; x++)
beatAvg += rates[x];
beatAvg /= RATE_SIZE;
}
}
 
Serial.print("IR=");
Serial.print(irValue);
Serial.print(", BPM=");
Serial.print(beatsPerMinute);
Serial.print(", Avg BPM=");
Serial.print(beatAvg);
 
if (irValue < 50000)
Serial.print(" No finger?");
 
Serial.println();

if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "temperature="+t + "ecg="+ecg + "BPM="+beatsPerMinute + "SpO2="+irValue ;
      
      
      http.begin(serverPath.c_str());
      

      
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }


delay(1);
  
}