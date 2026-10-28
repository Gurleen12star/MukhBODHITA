#!/usr/bin/env python3
"""
MukhBODHITA — Data Preprocessing Pipeline
==========================================
Loads raw VOC sensor readings and bio-impedance profiles,
cleans, normalises, and engineers features for model training.

Usage:
    python ml/scripts/preprocess.py --input data/raw --output data/processed
"""

import argparse
import json
import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split


# ── Config ─────────────────────────────────────────────────────────────────

VOC_FEATURES = ['mq135_v', 'tgs2600_v', 'acetaldehyde_ppm',
                'formaldehyde_ppm', 'isoprene_ppm', 'benzene_ppm']

BIO_FEATURES_BASE = ['imp_100hz', 'imp_500hz', 'imp_1khz',
                     'imp_5khz', 'imp_10khz', 'imp_50khz']

LABEL_COL = 'label'   # 1 = malignant, 0 = benign
RANDOM_SEED = 42


# ── VOC Preprocessing ───────────────────────────────────────────────────────

def preprocess_voc(df: pd.DataFrame) -> tuple:
    """
    Preprocess VOC breath sensor data.

    Steps:
    - Drop rows with null sensor readings
    - Clip outliers (IQR method)
    - Standardise using Z-score normalisation
    - Return train/val/test splits
    """
    df = df.dropna(subset=VOC_FEATURES + [LABEL_COL])

    # Clip outliers at 1st/99th percentile
    for col in VOC_FEATURES:
        lo, hi = df[col].quantile([0.01, 0.99])
        df[col] = df[col].clip(lo, hi)

    X = df[VOC_FEATURES].values
    y = df[LABEL_COL].values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_temp, y_train, y_temp = train_test_split(X_scaled, y, test_size=0.3, random_state=RANDOM_SEED, stratify=y)
    X_val, X_test, y_val, y_test     = train_test_split(X_temp, y_temp, test_size=0.5, random_state=RANDOM_SEED, stratify=y_temp)

    print(f"[VOC] Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")
    return X_train, X_val, X_test, y_train, y_val, y_test, scaler


# ── Bio-Impedance Preprocessing ─────────────────────────────────────────────

def preprocess_bio(df: pd.DataFrame) -> tuple:
    """
    Preprocess bio-impedance spectroscopy data.

    Steps:
    - Drop null rows
    - Engineer ratio features (suspicious / baseline)
    - Log-transform impedance values (right-skewed)
    - Min-max scale to [0, 1]
    - Return train/val/test splits
    """
    df = df.dropna(subset=BIO_FEATURES_BASE + [LABEL_COL])

    # Log-transform impedance (values range from ~10 kΩ to ~100 kΩ)
    for col in BIO_FEATURES_BASE:
        df[f'log_{col}'] = np.log1p(df[col])

    log_features = [f'log_{c}' for c in BIO_FEATURES_BASE]

    # Engineer ratio feature: drop from first freq to last (slope proxy)
    df['impedance_slope'] = (df['imp_50khz'] - df['imp_100hz']) / df['imp_100hz']

    all_features = log_features + ['impedance_slope']

    X = df[all_features].values
    y = df[LABEL_COL].values

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_temp, y_train, y_temp = train_test_split(X_scaled, y, test_size=0.3, random_state=RANDOM_SEED, stratify=y)
    X_val, X_test, y_val, y_test     = train_test_split(X_temp, y_temp, test_size=0.5, random_state=RANDOM_SEED, stratify=y_temp)

    print(f"[BIO] Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")
    return X_train, X_val, X_test, y_train, y_val, y_test, scaler


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='MukhBODHITA preprocessing pipeline')
    parser.add_argument('--input', default='data/raw', help='Raw data directory')
    parser.add_argument('--output', default='data/processed', help='Output directory')
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    # Load raw data (CSV format expected)
    voc_path = os.path.join(args.input, 'voc_samples.csv')
    bio_path = os.path.join(args.input, 'bio_samples.csv')

    if not os.path.exists(voc_path) or not os.path.exists(bio_path):
        print(f"[WARN] Raw data files not found in {args.input}")
        print("       Expected: voc_samples.csv, bio_samples.csv")
        print("       Run data collection pipeline first.")
        return

    voc_df = pd.read_csv(voc_path)
    bio_df = pd.read_csv(bio_path)

    print(f"\nLoaded {len(voc_df)} VOC samples, {len(bio_df)} bio-impedance samples")

    X_voc_train, X_voc_val, X_voc_test, y_voc_train, y_voc_val, y_voc_test, voc_scaler = preprocess_voc(voc_df)
    X_bio_train, X_bio_val, X_bio_test, y_bio_train, y_bio_val, y_bio_test, bio_scaler = preprocess_bio(bio_df)

    # Save processed splits as npy files
    for name, arr in {
        'voc_X_train': X_voc_train, 'voc_X_val': X_voc_val, 'voc_X_test': X_voc_test,
        'voc_y_train': y_voc_train, 'voc_y_val': y_voc_val, 'voc_y_test': y_voc_test,
        'bio_X_train': X_bio_train, 'bio_X_val': X_bio_val, 'bio_X_test': X_bio_test,
        'bio_y_train': y_bio_train, 'bio_y_val': y_bio_val, 'bio_y_test': y_bio_test,
    }.items():
        np.save(os.path.join(args.output, f'{name}.npy'), arr)

    print(f"\nProcessed data saved to: {args.output}")
    print("Run train_voc.py and train_bio.py to train the models.")


if __name__ == '__main__':
    main()
