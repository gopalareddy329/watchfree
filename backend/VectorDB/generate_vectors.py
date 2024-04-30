from sentence_transformers import SentenceTransformer
import numpy as np
import pandas as pd
from tqdm.notebook import tqdm

model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")

dtype_dict = {'movieId': int,'average_rating':float,'title':str,'genre':str,'imdbId': float, 'tmdbId': str,'image_link':str,'youtubeId':str,'rating_count':int,'overview':str}


df = pd.read_csv("/Users/gopalareddy/Desktop/repo/all_python/movierec/movie_overview.csv", dtype=dtype_dict)
df = df.dropna(subset=["overview"])
vectors = model.encode(
    [row.overview for row in df.itertuples()],
    show_progress_bar=True,
)
print("Vector shape : ")
print(vectors.shape)


# Save vectors to a NumPy .npy file
np.save("vectors.npy", vectors)
