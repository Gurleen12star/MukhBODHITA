#!/usr/bin/env python3
"""
MukhBODHITA — Bio-Impedance Random Forest Training Script
===========================================================
Trains a Random Forest classifier on bio-impedance spectroscopy data
for oral tissue malignancy classification.

Usage:
    python ml/scripts/train_bio.py --data data/processed --output ml/outputs
"""

import argparse
import json
import os
import pickle
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (classification_report, roc_auc_score,
                             confusion_matrix, cohen_kappa_score)
from sklearn.model_selection import GridSearchCV


def train(data_dir: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)

    # Load preprocessed data
    X_train = np.load(os.path.join(data_dir, 'bio_X_train.npy'))
    X_val   = np.load(os.path.join(data_dir, 'bio_X_val.npy'))
    X_test  = np.load(os.path.join(data_dir, 'bio_X_test.npy'))
    y_train = np.load(os.path.join(data_dir, 'bio_y_train.npy'))
    y_val   = np.load(os.path.join(data_dir, 'bio_y_val.npy'))
    y_test  = np.load(os.path.join(data_dir, 'bio_y_test.npy'))

    # Combine train + val for final model
    X_fit = np.vstack([X_train, X_val])
    y_fit = np.concatenate([y_train, y_val])

    print(f"Fit set: {X_fit.shape} | Test: {X_test.shape}")

    # Hyperparameter search
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth':    [8, 12, None],
        'min_samples_split': [2, 5],
    }

    rf = RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1)

    print("Running GridSearchCV (this may take a moment)...")
    gs = GridSearchCV(rf, param_grid, cv=5, scoring='roc_auc', n_jobs=-1, verbose=1)
    gs.fit(X_fit, y_fit)

    best_model = gs.best_estimator_
    print(f"Best params: {gs.best_params_}")

    # Evaluate on test set
    y_pred_prob = best_model.predict_proba(X_test)[:, 1]
    y_pred      = (y_pred_prob >= 0.5).astype(int)

    report = classification_report(y_test, y_pred, target_names=['Benign', 'Malignant'], output_dict=True)
    auc    = roc_auc_score(y_test, y_pred_prob)
    kappa  = cohen_kappa_score(y_test, y_pred)
    cm     = confusion_matrix(y_test, y_pred).tolist()

    # Feature importance
    feature_names = [f'log_imp_{f}' for f in ['100hz','500hz','1khz','5khz','10khz','50khz']] + ['impedance_slope']
    importances = dict(zip(feature_names, best_model.feature_importances_.round(4).tolist()))

    results = {
        'model': 'BIO_RandomForest',
        'best_params': gs.best_params_,
        'test_accuracy': round(report['accuracy'], 4),
        'auc_roc': round(auc, 4),
        'sensitivity': round(report['Malignant']['recall'], 4),
        'specificity': round(report['Benign']['recall'], 4),
        'f1_malignant': round(report['Malignant']['f1-score'], 4),
        'cohen_kappa': round(kappa, 4),
        'confusion_matrix': cm,
        'feature_importance': importances,
    }

    print("\n=== Bio-Impedance RF Test Results ===")
    print(json.dumps(results, indent=2))

    # Save model
    model_path = os.path.join(output_dir, 'model_bio.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(best_model, f)

    # Save results
    results_path = os.path.join(output_dir, 'results.json')
    existing = {}
    if os.path.exists(results_path):
        with open(results_path) as f:
            existing = json.load(f)
    existing['bio'] = results
    with open(results_path, 'w') as f:
        json.dump(existing, f, indent=2)

    print(f"\nModel saved: {model_path}")
    print(f"Results saved: {results_path}")


def main():
    parser = argparse.ArgumentParser(description='Train MukhBODHITA Bio-Impedance RF')
    parser.add_argument('--data', default='data/processed')
    parser.add_argument('--output', default='ml/outputs')
    args = parser.parse_args()
    train(args.data, args.output)


if __name__ == '__main__':
    main()
