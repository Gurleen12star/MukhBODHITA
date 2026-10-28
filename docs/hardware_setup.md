# MukhBODHITA — Hardware Setup Guide

## OncoSniff OS-ESP32-8492 — Assembly & Configuration

---

## Components Required

| Component | Model | Qty | Purpose |
|---|---|---|---|
| Microcontroller | ESP32 WROOM-32D | 1 | Main compute + BLE |
| Gas Sensor 1 | MQ-135 | 1 | VOC / NH3 / benzene detection |
| Gas Sensor 2 | TGS2600 (Figaro) | 1 | H2 / CO / acetaldehyde detection |
| Temp/Humidity | DHT11 | 1 | Environmental calibration |
| Bio-Impedance | Custom AD5933 breakout | 1 | Impedance spectroscopy |
| Probe Electrode | Copper bipolar (3mm tip) | 1 | Tissue contact measurement |
| ADC | ADS1115 (16-bit, 4ch) | 1 | High-resolution sensor reading |
| Power | TP4056 + LiPo 3.7V 2200mAh | 1 | Rechargeable battery |
| Enclosure | 3D-printed PLA (STL in /assets) | 1 | Housing |

---

## Wiring Diagram

```
ESP32                  ADS1115
GPIO21 (SDA) ──────── SDA
GPIO22 (SCL) ──────── SCL
3.3V         ──────── VDD
GND          ──────── GND
                       A0 ── MQ-135 (AOUT)
                       A1 ── TGS2600 (AOUT)

ESP32                  DHT11
GPIO4        ──────── DATA
3.3V         ──────── VCC
GND          ──────── GND

ESP32                  AD5933 (BIS)
GPIO21 (SDA) ──────── SDA
GPIO22 (SCL) ──────── SCL
GPIO5        ──────── RST
Bio-Probe+   ──────── VOUT (via coupling cap)
Bio-Probe-   ──────── VIN (via feedback resistor)
```

---

## Firmware Configuration

The ESP32 firmware (not included in this repo) implements:

1. **BLE GATT Server** — Advertises as "OncoSniff-XXXX"
2. **Sensor Reading Loop** — 100ms interval, 16-bit ADC
3. **DHT11 Polling** — Every 2 seconds
4. **AD5933 Sweep** — 6-point impedance sweep from 100 Hz to 50 kHz
5. **JSON Payload** — Sends structured JSON over BLE characteristic

### BLE Data Format

```json
{
  "type": "scan_data",
  "mq135_v": 3.28,
  "tgs2600_v": 2.41,
  "dht_temp": 32.8,
  "dht_hum": 71.2,
  "bio_kohm": [18.4, 16.2, 15.1, 14.8, 14.5, 14.2],
  "bio_freqs": [100, 500, 1000, 5000, 10000, 50000],
  "timestamp": 1730050200000
}
```

---

## Calibration Protocol

### Gas Sensor Warm-up

1. Power ON the device
2. Wait **60 seconds** for MQ-135 sensor pre-heating
3. Expose to clean ambient air for baseline recording (30 seconds)
4. Device is ready when LED turns **solid green**

### Bio-Impedance Calibration

1. Before first use, measure impedance of a **known resistor** (10 kΩ ± 1%)
2. Compare reading with expected value; adjust gain factor in firmware if deviation > 5%
3. Store calibration coefficient in ESP32 EEPROM

---

## LED Indicator States

| LED State | Meaning |
|---|---|
| Solid Red | Booting / Initialising |
| Blinking Red | Bluetooth searching |
| Blinking Yellow | Sensor warm-up in progress |
| Solid Green | Ready — paired and calibrated |
| Blinking Green | Data transmission active |
| Solid Blue | Charging via USB |

---

## Troubleshooting

| Symptom | Possible Cause | Fix |
|---|---|---|
| LED stays red | Sensor fault or low battery | Charge device, restart |
| Device not found in Bluetooth | Not advertising | Power cycle device |
| High baseline readings | Sensor contamination | Clean nozzle, recalibrate |
| Impedance drift | Probe oxidation | Clean probe with isopropanol |
| App shows "Device not connected" | BLE timeout | Restart app, retry within 1 metre |
