# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # import firebase_admin
# # from firebase_admin import credentials, firestore
# # from sklearn.feature_extraction.text import TfidfVectorizer
# # from sklearn.metrics.pairwise import cosine_similarity
# # from sklearn.cluster import KMeans
# # import numpy as np
# # import random

# # # Initialize Firebase
# # cred = credentials.Certificate("firebase_config.json")
# # firebase_admin.initialize_app(cred)
# # db = firestore.client()

# # # Initialize FastAPI
# # app = FastAPI()

# # # Enable CORS (allow your Android app to connect)
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # @app.get("/")
# # def read_root():
# #     return {"message": "Trip Recommendation API is running"}

# # @app.get("/recommend/{user_id}")
# # def recommend(user_id: str):
# #     user_ref = db.collection('users').document(user_id)
# #     user_data = user_ref.get().to_dict()

# #     destinations_ref = db.collection('places')
# #     destinations = [doc.to_dict() for doc in destinations_ref.stream()]

# #     if not destinations or not user_data:
# #         return {"message": "No data found"}

# #     destination_texts = []
# #     for dest in destinations:
# #         combined_text = " ".join([
# #             dest.get("Desc", ""),
# #             dest.get("category", ""),
# #             " ".join(dest.get("Hotels", [])),
# #             dest.get("district", "")
# #         ])
# #         destination_texts.append(combined_text)

# #     user_profile_text = " ".join(user_data.get('interests', []) + user_data.get('places', []))

# #     vectorizer = TfidfVectorizer()
# #     destination_vectors = vectorizer.fit_transform(destination_texts)
# #     user_vector = vectorizer.transform([user_profile_text])

# #     num_clusters = 3
# #     kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
# #     kmeans.fit(destination_vectors)

# #     user_cluster = kmeans.predict(user_vector)[0]
# #     cluster_indices = np.where(kmeans.labels_ == user_cluster)[0]

# #     matching_destinations = [destinations[i] for i in cluster_indices]

# #     cluster_vectors = destination_vectors[cluster_indices]
# #     similarities = cosine_similarity(user_vector, cluster_vectors).flatten()
# #     top_indices = similarities.argsort()[::-1]
# #     sorted_destinations = [matching_destinations[i] for i in top_indices]

# #     interests = set(interest.lower() for interest in user_data.get('interests', []))
# #     places = set(place.lower() for place in user_data.get('places', []))

# #     def destination_priority(dest):
# #         category_match = dest.get("category", "").lower() in interests
# #         district_match = dest.get("district", "").lower() in places
# #         if category_match and district_match:
# #             return 0
# #         elif category_match:
# #             return 1
# #         elif district_match:
# #             return 2
# #         else:
# #             return 3

# #     sorted_destinations.sort(key=destination_priority)

# #     # 👉 Filter matching interests globally, not just in cluster
# #     global_interest_matches = [
# #         dest for dest in destinations 
# #         if dest.get("category", "").lower() in interests
# #     ]

# #     # If we have interest matches globally, rank those first
# #     if global_interest_matches:
# #         global_interest_matches.sort(key=destination_priority)
# #         final_recommendations = global_interest_matches[:15]
# #     else:
# #         # fallback to cluster-based destinations if no interest matches
# #         final_recommendations = sorted_destinations[:15]

# #     random.shuffle(final_recommendations)

# #     return {"recommendations": final_recommendations}

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import firebase_admin
# from firebase_admin import credentials, firestore
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.cluster import KMeans
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np
# import random

# # Initialize Firebase
# cred = credentials.Certificate("firebase_config.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# # Initialize FastAPI
# app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {"message": "Trip Recommendation API is running"}

# @app.get("/recommend/{user_id}")
# def recommend(user_id: str):
#     # Fetch user data
#     user_ref = db.collection('users').document(user_id)
#     user_data = user_ref.get().to_dict()

#     # Fetch destinations
#     destinations_ref = db.collection('places')
#     destinations = [doc.to_dict() for doc in destinations_ref.stream()]

#     if not destinations or not user_data:
#         return {"message": "No data found"}

#     interests = set(interest.lower() for interest in user_data.get('interests', []))
#     places = set(place.lower() for place in user_data.get('places', []))

#     # Prepare TF-IDF vectors for Interests (categories)
#     category_texts = [dest.get("category", "") for dest in destinations]
#     category_vectorizer = TfidfVectorizer()
#     category_vectors = category_vectorizer.fit_transform(category_texts)

#     user_category_text = " ".join(user_data.get('interests', []))
#     user_category_vector = category_vectorizer.transform([user_category_text])

#     # KMeans clustering for Interests
#     num_clusters = 3
#     kmeans_categories = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
#     kmeans_categories.fit(category_vectors)

#     user_interest_cluster = kmeans_categories.predict(user_category_vector)[0]
#     interest_cluster_indices = np.where(kmeans_categories.labels_ == user_interest_cluster)[0]
#     interest_destinations = [destinations[i] for i in interest_cluster_indices]

#     # Prepare TF-IDF vectors for Places (districts)
#     place_texts = [dest.get("district", "") for dest in destinations]
#     place_vectorizer = TfidfVectorizer()
#     place_vectors = place_vectorizer.fit_transform(place_texts)

#     user_place_text = " ".join(user_data.get('places', []))
#     user_place_vector = place_vectorizer.transform([user_place_text])

#     # KMeans clustering for Places
#     kmeans_places = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
#     kmeans_places.fit(place_vectors)

#     user_place_cluster = kmeans_places.predict(user_place_vector)[0]
#     place_cluster_indices = np.where(kmeans_places.labels_ == user_place_cluster)[0]
#     place_destinations = [destinations[i] for i in place_cluster_indices]

#     # Merge both lists without duplicates
#     seen_keys = set()
#     combined_destinations = []

#     for dest in interest_destinations + place_destinations:
#         key = dest.get("_key")
#         if key and key not in seen_keys:
#             combined_destinations.append(dest)
#             seen_keys.add(key)

#     # Prioritize destinations matching both user's interests and places
#     def destination_priority(dest):
#         category_match = dest.get("category", "").lower() in interests
#         district_match = dest.get("district", "").lower() in places
#         if category_match and district_match:
#             return 0
#         elif category_match:
#             return 1
#         elif district_match:
#             return 2
#         else:
#             return 3

#     combined_destinations.sort(key=destination_priority)

#     # Fallback if no combined match
#     if not combined_destinations:
#         combined_destinations = destinations

#     # Shuffle and pick top 15
#     random.shuffle(combined_destinations)
#     final_recommendations = combined_destinations[:15]

#     return {"recommendations": final_recommendations}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import random

# Initialize Firebase
cred = credentials.Certificate("firebase_config.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Initialize FastAPI
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Trip Recommendation API is running"}

@app.get("/recommend/{user_id}")
def recommend(user_id: str):
    user_ref = db.collection('users').document(user_id)
    user_data = user_ref.get().to_dict()

    destinations_ref = db.collection('places')
    destinations = [doc.to_dict() for doc in destinations_ref.stream()]

    if not destinations or not user_data:
        return {"message": "No data found"}

    interests = set(interest.lower() for interest in user_data.get('interests', []))
    places = set(place.lower() for place in user_data.get('places', []))

    # Prepare TF-IDF vectors for destination descriptions and categories
    destination_texts = []
    for dest in destinations:
        combined_text = " ".join([
            dest.get("Desc", ""),
            dest.get("category", ""),
            " ".join(dest.get("Hotels", [])),
            dest.get("district", "")
        ])
        destination_texts.append(combined_text)

    user_profile_text = " ".join(user_data.get('interests', []) + user_data.get('places', []))

    vectorizer = TfidfVectorizer()
    destination_vectors = vectorizer.fit_transform(destination_texts)
    user_vector = vectorizer.transform([user_profile_text])

    # Cluster destinations
    num_clusters = 3
    kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
    kmeans.fit(destination_vectors)

    user_cluster = kmeans.predict(user_vector)[0]
    cluster_indices = np.where(kmeans.labels_ == user_cluster)[0]

    matching_destinations = [destinations[i] for i in cluster_indices]

    # Similarity scores
    cluster_vectors = destination_vectors[cluster_indices]
    similarities = cosine_similarity(user_vector, cluster_vectors).flatten()
    top_indices = similarities.argsort()[::-1]
    sorted_destinations = [matching_destinations[i] for i in top_indices]

    # Prioritize matching interests and places
    def destination_priority(dest):
        category_match = dest.get("category", "").lower() in interests
        key_match = any(place in dest.get("_key", "").lower() for place in places)
        desc_match = any(place in dest.get("Desc", "").lower() for place in places)

        place_match = key_match or desc_match

        if category_match and place_match:
            return 0
        elif category_match:
            return 1
        elif place_match:
            return 2
        else:
            return 3

    sorted_destinations.sort(key=destination_priority)

    # If no matches found, fallback to global interest matches
    global_interest_matches = [
        dest for dest in destinations
        if dest.get("category", "").lower() in interests
        or any(place in dest.get("_key", "").lower() for place in places)
        or any(place in dest.get("Desc", "").lower() for place in places)
    ]

    if global_interest_matches:
        global_interest_matches.sort(key=destination_priority)
        final_recommendations = global_interest_matches[:15]
    else:
        final_recommendations = sorted_destinations[:15]

    random.shuffle(final_recommendations)

    return {"recommendations": final_recommendations}
