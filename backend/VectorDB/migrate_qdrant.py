import numpy as np
import pandas as pd
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from qdrant_client.http import models
from tqdm import tqdm
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")


dtype_dict = {'movieId': int,'average_rating':float,'title':str,'genre':str,'imdbId': float, 'tmdbId': str,'image_link':str,'youtubeId':str,'rating_count':int,'overview':str}


df = pd.read_csv("/Users/gopalareddy/Desktop/repo/all_python/movierec/movie_overview.csv", dtype=dtype_dict)
df = df.dropna(subset=["overview"])

ids = df.movieId.values

client = QdrantClient("http://localhost:6333")

client.recreate_collection(
    collection_name="Movie_Overview_EN",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
)
# Use tqdm to create a progress bar
with tqdm(total=len(df)) as pbar:
    # Iterate over each row in the DataFrame and upsert the data
    for idx, row in df.iterrows():
        # print(idx)
        vector = model.encode(row['overview'])
        try :
            client.upsert(
                collection_name="Movie_Overview_EN",
                points=models.Batch(
                    ids=[int(row['imdbId'])],
                    vectors=[vector.tolist()] , 
                    # payloads=payload
                )
            )
        except Exception as e: 
            print(e)
            break
        pbar.update(1)  # Update the progress bar
