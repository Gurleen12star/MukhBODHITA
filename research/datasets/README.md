# MukhBODHITA — Dataset Documentation

## Overview

This directory documents the datasets used to train and evaluate the MukhBODHITA AI models. Raw data files are not included in this repository due to clinical data privacy agreements.

---

## Dataset 1: VOC Breath Profiles (voc_samples.csv)

| Field | Value |
|---|---|
| Samples | 1,247 total (634 malignant, 613 benign) |
| Collection Period | January 2025 – September 2026 |
| Sensor Array | MQ-135 + TGS2600 + DHT11 |
| Collection Protocol | 5-second forced exhalation, 3 repeats per patient |
| Preprocessing | Ambient subtraction, IQR clipping, Z-score normalisation |

### Schema

| Column | Type | Description |
|---|---|---|
| patient_id | string | Anonymised patient identifier |
| mq135_v | float | MQ-135 output voltage (V) |
| tgs2600_v | float | TGS2600 output voltage (V) |
| acetaldehyde_ppm | float | Estimated acetaldehyde concentration (ppm) |
| formaldehyde_ppm | float | Estimated formaldehyde concentration (ppm) |
| isoprene_ppm | float | Estimated isoprene concentration (ppm) |
| benzene_ppm | float | Estimated benzene derivative (ppm) |
| dht_temp_c | float | Ambient temperature (°C) |
| dht_hum_pct | float | Ambient relative humidity (%) |
| label | int | 1 = malignant, 0 = benign |

---

## Dataset 2: Bio-Impedance Profiles (bio_samples.csv)

| Field | Value |
|---|---|
| Samples | 1,189 total (601 malignant site, 588 benign site) |
| Collection Period | January 2025 – September 2026 |
| Electrode Type | Copper bipolar probe, 50 µA AC current |
| Frequency Bands | 100 Hz, 500 Hz, 1 kHz, 5 kHz, 10 kHz, 50 kHz |
| Preprocessing | Log transform, impedance slope feature, MinMax scaling |

### Schema

| Column | Type | Description |
|---|---|---|
| patient_id | string | Anonymised patient identifier |
| site_type | string | 'suspicious' or 'healthy_reference' |
| imp_100hz | float | Impedance at 100 Hz (kΩ) |
| imp_500hz | float | Impedance at 500 Hz (kΩ) |
| imp_1khz | float | Impedance at 1 kHz (kΩ) |
| imp_5khz | float | Impedance at 5 kHz (kΩ) |
| imp_10khz | float | Impedance at 10 kHz (kΩ) |
| imp_50khz | float | Impedance at 50 kHz (kΩ) |
| label | int | 1 = malignant, 0 = benign |

---

## Data Ethics & Privacy

- All data collected under institutional ethics board approval (Protocol #AIIMS-OM-2025-04)
- Fully de-identified before model training — no name, DOB, or location stored
- Data sharing governed by MoU between collecting institution and MukhBODHITA team
- GDPR and India PDPB 2023 compliant data handling procedures followed

## Accessing the Dataset

Due to patient privacy agreements, the raw dataset is not publicly released. Researchers interested in collaboration or data access may contact the team via GitHub Issues.
