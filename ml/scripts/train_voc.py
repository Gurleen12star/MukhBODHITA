#!/usr/bin/env python3
"""
MukhBODHITA — VOC CNN Training Script
======================================
Trains a 1D Convolutional Neural Network on VOC breath sensor data
for oral cancer classification.

Usage:
    python ml/scripts/train_voc.py --data data/processed --output ml/outputs
"""

import argparse
import json
import os
import numpy as np

try:
    import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras import layers
    from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False
    print("[WARN] TensorFlow not installed. Install with: pip install tensorflow")


def build_voc_model(input_dim: int) -> 'keras.Model':
    """
    Build a 1D-CNN for VOC biomarker classification.

    Architecture:
        Input → Reshape → Conv1D(32) → BatchNorm → MaxPool
               → Conv1D(64) → BatchNorm → GlobalAvgPool
               → Dense(128, relu) → Dropout(0.4)
               → Dense(1, sigmoid)
    """
    inputs = keras.Input(shape=(input_dim,), name='voc_input')
    x = layers.Reshape((input_dim, 1))(inputs)

    x = layers.Conv1D(32, kernel_size=2, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.MaxPooling1D(pool_size=2)(x)

    x = layers.Conv1D(64, kernel_size=2, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.GlobalAveragePooling1D()(x)

    x = layers.Dense(128, activation='relu')(x)
    x = layers.Dropout(0.4)(x)
    outputs = layers.Dense(1, activation='sigmoid', name='voc_output')(x)

    model = keras.Model(inputs=inputs, outputs=outputs, name='MukhBODHITA_VOC_CNN')
    return model


def train(data_dir: str, output_dir: str):
    if not TF_AVAILABLE:
        print("Cannot train: TensorFlow not available.")
        return

    os.makedirs(output_dir, exist_ok=True)

    # Load preprocessed data
    X_train = np.load(os.path.join(data_dir, 'voc_X_train.npy'))
    X_val   = np.load(os.path.join(data_dir, 'voc_X_val.npy'))
    X_test  = np.load(os.path.join(data_dir, 'voc_X_test.npy'))
    y_train = np.load(os.path.join(data_dir, 'voc_y_train.npy'))
    y_val   = np.load(os.path.join(data_dir, 'voc_y_val.npy'))
    y_test  = np.load(os.path.join(data_dir, 'voc_y_test.npy'))

    print(f"Train: {X_train.shape} | Val: {X_val.shape} | Test: {X_test.shape}")

    model = build_voc_model(X_train.shape[1])
    model.summary()

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='binary_crossentropy',
        metrics=['accuracy', keras.metrics.AUC(name='auc')]
    )

    callbacks = [
        keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True, monitor='val_auc', mode='max'),
        keras.callbacks.ReduceLROnPlateau(patience=5, factor=0.5, monitor='val_loss'),
        keras.callbacks.ModelCheckpoint(
            filepath=os.path.join(output_dir, 'model_voc_best.h5'),
            save_best_only=True, monitor='val_auc', mode='max'
        )
    ]

    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=100,
        batch_size=32,
        callbacks=callbacks,
        verbose=1
    )

    # Evaluate on test set
    y_pred_prob = model.predict(X_test).flatten()
    y_pred = (y_pred_prob >= 0.5).astype(int)

    report = classification_report(y_test, y_pred, target_names=['Benign', 'Malignant'], output_dict=True)
    auc    = roc_auc_score(y_test, y_pred_prob)
    cm     = confusion_matrix(y_test, y_pred).tolist()

    results = {
        'model': 'VOC_CNN',
        'test_accuracy': report['accuracy'],
        'auc_roc': round(auc, 4),
        'sensitivity': round(report['Malignant']['recall'], 4),
        'specificity': round(report['Benign']['recall'], 4),
        'f1_malignant': round(report['Malignant']['f1-score'], 4),
        'confusion_matrix': cm,
    }

    print("\n=== VOC CNN Test Results ===")
    print(json.dumps(results, indent=2))

    # Save model and results
    model.save(os.path.join(output_dir, 'model_voc.h5'))

    results_path = os.path.join(output_dir, 'results.json')
    existing = {}
    if os.path.exists(results_path):
        with open(results_path) as f:
            existing = json.load(f)
    existing['voc'] = results
    with open(results_path, 'w') as f:
        json.dump(existing, f, indent=2)

    print(f"\nModel saved: {output_dir}/model_voc.h5")
    print(f"Results saved: {results_path}")


def main():
    parser = argparse.ArgumentParser(description='Train MukhBODHITA VOC CNN')
    parser.add_argument('--data', default='data/processed')
    parser.add_argument('--output', default='ml/outputs')
    args = parser.parse_args()
    train(args.data, args.output)


if __name__ == '__main__':
    main()
