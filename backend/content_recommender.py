from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
import threading
import time


class Recommender : 
    def __init__(self ):
        model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")
        self.client = client = QdrantClient("http://localhost:6333")
        self.model = model
        self.cache = {} 
        self.collection_name = "Movie_Overview_EN"
    def recommend(self ,movie_id ,movie_overview) : 
        query_vec = self.model.encode(movie_overview)
        recommendations = self.client.search(
            collection_name = self.collection_name,
            query_vector = query_vec,
            with_payload=True , 
            limit = 11
        )
        ids = [data.id for data in recommendations if data.id!=movie_id ]
        return ids[:10]
    
class RecommenderWithCache:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2", device="cuda")
        self.client = QdrantClient("http://localhost:6333")
        self.cache = {}
        self.collection_name = "Movie_Overview_EN"
        self.cache_lock = threading.Lock()
        self.cleanup_thread = threading.Thread(target=self.cleanup_cache, daemon=True)
        self.cleanup_thread.start()

    def cleanup_cache(self):
        while True:
            with self.cache_lock:
                current_time = time.time()
                keys_to_delete = [key for key, (timestamp, _) in self.cache.items() if current_time - timestamp > 30]
                for key in keys_to_delete:
                    del self.cache[key]
            time.sleep(1)  # Check every second for keys to delete

    def recommend(self, movie_id, movie_overview):
        with self.cache_lock:
            if movie_id in self.cache:
                print("Cache hit")
                _, result = self.cache[movie_id]
                return result

        query_vec = self.model.encode(movie_overview)
        recommendations = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vec,
            with_payload=True,
            limit=11
        )

        ids = [data.id for data in recommendations if data.id != movie_id]
        result = ids[:10]

        with self.cache_lock:
            self.cache[movie_id] = (time.time(), result)

        return result
    

def main():
    recommender = RecommenderWithCache()
    movie_overview = "Over ten years have passed since the first machine called The Terminator tried to kill Sarah Connor and her unborn son, John. The man who will become the future leader of the human resistance against the Machines is now a healthy young boy. However, another Terminator, called the T-1000, is sent back through time by the supercomputer Skynet. This new Terminator is more advanced and more powerful than its predecessor and its mission is to kill John Connor when he's still a child. However, Sarah and John do not have to face the threat of the T-1000 alone. Another Terminator (identical to the same model that tried and failed to kill Sarah Connor in 1984) is also sent back through time to protect them. Now, the battle for tomorrow has begun"
    print(recommender.recommend(100 , movie_overview=movie_overview))
    # print("next")
    time.sleep(10)
    print(recommender.recommend(100 , movie_overview=movie_overview))

if __name__ == "__main__":
    main()


