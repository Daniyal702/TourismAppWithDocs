import numpy as np
from sklearn.cluster import KMeans
import joblib
from categories import categories

# Simulated dummy training data: 100 users, 13 category click counts (values between 0 and 10)
np.random.seed(42)
X_train = np.random.randint(0, 10, size=(100, len(categories)))

# Define KMeans model (3 clusters here as example — tune as needed)
kmeans = KMeans(n_clusters=3, random_state=42)

# Fit model
kmeans.fit(X_train)

# Save model to file
joblib.dump(kmeans, 'kmeans_model.pkl')

print("✅ KMeans model trained and saved to model/kmeans_model.pkl")
