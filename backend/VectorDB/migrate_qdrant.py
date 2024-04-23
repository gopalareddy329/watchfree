import numpy as np
import pandas as pd
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from qdrant_client.http import models
from tqdm import tqdm
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")


# Load the DataFrame to get the ids
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
df = pd.read_csv("movies_metadata.csv", dtype=dtype_mapping)
df = df.dropna(subset=["overview"])

ids = df.id.values

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
        payload = {
            "adult": row["adult"],
            "belongs_to_collection": row["belongs_to_collection"],
            "budget": row["budget"],
            "genres": row["genres"],
            "homepage": row["homepage"],
            "id": row["id"],
            "imdb_id": row["imdb_id"],
            "original_language": row["original_language"],
            "original_title": row["original_title"],
            "overview": row["overview"],
            "popularity": row["popularity"],
            "poster_path": row["poster_path"],
            "production_companies": row["production_companies"],
            "production_countries": row["production_countries"],
            "release_date": row["release_date"],
            "revenue": row["revenue"],
            "runtime": row["runtime"],
            "spoken_languages": row["spoken_languages"],
            "status": row["status"],
            "tagline": row["tagline"],
            "title": row["title"],
            "video": row["video"],
            "vote_average": row["vote_average"],
            "vote_count": row["vote_count"]
        }
        try :
            client.upsert(
                collection_name="Movie_Overview_EN",
                points=models.Batch(
                    ids=[int(row["id"])],
                    vectors=[vector.tolist()] , 
                    # payloads=payload
                )
            )
        except : 
            print(idx)
        pbar.update(1)  # Update the progress bar
