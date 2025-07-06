# import numpy as np
# import joblib
# from categories import categories

# # Load KMeans model
# model = joblib.load('model/kmeans_model.pkl')

# def infer_interest(click_counts):
#     if len(click_counts) != len(categories):
#         raise ValueError(f"Expected {len(categories)} click counts")

#     # Convert click counts to 2D numpy array (single sample)
#     X_input = np.array(click_counts).reshape(1, -1)

#     # Predict cluster label
#     cluster_label = model.predict(X_input)[0]

#     # For this demo: pick the category with highest click count as "inferred interest"
#     inferred_category_index = np.argmax(click_counts)
#     inferred_category = categories[inferred_category_index]

#     return inferred_category

from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load your trained KMeans model
kmeans_model = joblib.load('kmeans_model.pkl')

# Define your categories in order (must match training)
categories = [
    'Nature', 'Mountainous', 'National Park', 'Museum', 'Fort', 'Hill Station',
    'Coastal', 'City Attractions', 'Valley', 'Waterfall', 'Temple', 'Desert', 'Resort'
]

class ClickCounts(BaseModel):
    click_counts: list  # ordered list of counts by category

@app.post("/aiinterest")
def predict_interest(data: ClickCounts):
    try:
        counts_array = np.array([data.click_counts])  # 2D array for model
        cluster = kmeans_model.predict(counts_array)[0]
        
        # Map cluster number to a representative category
        # (this depends on how you labeled your clusters during training)
        predicted_category = categories[cluster % len(categories)]

        return {"predicted_category": predicted_category}
    except Exception as e:
        return {"error": str(e)}
