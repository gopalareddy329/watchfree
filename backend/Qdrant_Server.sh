#!/bin/bash

# Check if qdrant_storage folder exists
if [ ! -d "qdrant_storage" ]; then
    echo "qdrant_storage folder not found, pulling qdrant/qdrant image..."
    docker pull qdrant/qdrant
else
    echo "qdrant_storage folder found."
fi
# Run the Qdrant Server on port 6333
docker run -p 6333:6333 \
    -v $(pwd)/qdrant_storage:/qdrant/storage \
    qdrant/qdrant

