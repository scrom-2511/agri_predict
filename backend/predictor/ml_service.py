# predictor/ml_service.py
import pickle
from pathlib import Path
import pandas as pd

MODEL_DIR = Path(__file__).resolve().parent / "ml_model"

with open(MODEL_DIR / "best_model.pkl", "rb") as f:
    _model = pickle.load(f)

with open(MODEL_DIR / "encoders.pkl", "rb") as f:
    _encoders = pickle.load(f)

with open(MODEL_DIR / "feature_columns.pkl", "rb") as f:
    _feature_cols = pickle.load(f)


def predict_fertilizer(data: dict) -> str:
    """
    data keys expected: temperature, humidity, moisture, soil_type,
    crop_type, nitrogen, potassium, phosphorous
    """
    row = {
        "Temparature": data["temperature"],
        "Humidity": data["humidity"],
        "Moisture": data["moisture"],
        "Soil_Type_enc": _encoders["Soil_Type"].transform([data["soil_type"]])[0],
        "Crop_Type_enc": _encoders["Crop_Type"].transform([data["crop_type"]])[0],
        "Nitrogen": data["nitrogen"],
        "Potassium": data["potassium"],
        "Phosphorous": data["phosphorous"],
    }
    X_input = pd.DataFrame([row])[_feature_cols]
    pred_encoded = _model.predict(X_input)[0]
    return _encoders["Fertilizer"].inverse_transform([pred_encoded])[0]