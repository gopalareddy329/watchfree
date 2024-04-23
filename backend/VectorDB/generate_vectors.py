from sentence_transformers import SentenceTransformer
import numpy as np
import pandas as pd
from tqdm.notebook import tqdm

model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")

dtype_mapping = {
    'adult': str,
    'belongs_to_collection': str,
    'budget': str,
    'genres': str,
    'homepage': str,
    'id': str,
    'imdb_id': str,
    'original_language': str,
    'original_title': str,
    'overview': str,
    'popularity': str,
    'poster_path': str,
    'production_companies': str,
    'production_countries': str,
    'release_date': str,
    'revenue': float,
    'runtime': float,
    'spoken_languages': str,
    'status': str,
    'tagline': str,
    'title': str,
    'video': str,
    'vote_average': float,
    'vote_count': float
}

df = pd.read_csv("data/movies_metadata.csv", dtype=dtype_mapping)
df = df.dropna(subset=["overview"])
vectors = model.encode(
    [row.overview for row in df.itertuples()],
    show_progress_bar=True,
)
print("Vector shape : ")
print(vectors.shape)


# Save vectors to a NumPy .npy file
np.save("vectors.npy", vectors)
