import { useEffect, useState, useRef, useCallback } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import StarRatings from "react-star-ratings";

export default function Home() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [sort, setSort] = useState("default");
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchCreatorsBatch = async (clear = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let baseQuery = query(collection(db, "creators"), orderBy("name"), limit(6));
      if (lastDoc) {
        baseQuery = query(baseQuery, startAfter(lastDoc));
      }

      const snapshot = await getDocs(baseQuery);
      const docs = snapshot.docs;

      const creatorsBatch = await Promise.all(
        docs.map(async (doc) => {
          const data = doc.data();
          const reviewsSnap = await getDocs(collection(db, `creators/${doc.id}/reviews`));
          const reviews = reviewsSnap.docs.map((r) => r.data());
          const reviewPreview = reviews[0]?.text || "";

          return {
            id: doc.id,
            ...data,
            reviews,
            reviewPreview,
          };
        })
      );

      const tagSet = new Set(clear ? [] : allTags);
      creatorsBatch.forEach((creator) => {
        creator.tags?.forEach((tag) => tagSet.add(tag));
      });

      setCreators(clear ? creatorsBatch : [...creators, ...creatorsBatch]);
      setAllTags(Array.from(tagSet));
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === 6);
    } catch (err) {
      console.error("Error loading creators:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCreatorsBatch(true);
  }, []);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) fetchCreatorsBatch();
    },
    [lastDoc, loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const filteredCreators = creators
    .filter((c) => {
      const nameMatch = c.name?.toLowerCase().includes(search.toLowerCase());
      const tagMatch = c.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
      return nameMatch || tagMatch;
    })
    .sort((a, b) => {
      if (sort === "top-rated") {
        const aAvg = a.reviews?.reduce((acc, r) => acc + r.rating, 0) / (a.reviews?.length || 1);
        const bAvg = b.reviews?.reduce((acc, r) => acc + r.rating, 0) / (b.reviews?.length || 1);
        return bAvg - aAvg;
      } else if (sort === "most-reviewed") {
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      }
      return 0;
    });

  return (
    <div className="bg-white pt-8 px-4 max-w-6xl mx-auto">
      <div className="mb-4 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <span
            key={tag}
            onClick={() => setSearch(tag)}
            className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-red-200 transition"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold">🔥 Trending Creators</h2>
        <div className="flex gap-2 flex-wrap">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="default">Sort: Default</option>
            <option value="top-rated">⭐ Top Rated</option>
            <option value="most-reviewed">🔥 Most Reviewed</option>
          </select>
          <input
            type="text"
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            disabled
            title="Coming Soon 🌶️"
            className="bg-[#ff1a1a] text-white px-4 py-2 rounded cursor-not-allowed flex items-center gap-2 font-semibold hover:brightness-110"
          >
            🔒 Add Creator
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCreators.map((creator) => (
          <a
            href={`/creator/${creator.id}`}
            key={creator.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition border"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg truncate">{creator.name}</h3>
              {creator.trending && (
                <span className="text-xs text-red-500 border border-red-500 px-2 py-0.5 rounded-full">
                  🔥 Trending
                </span>
              )}
            </div>

            {creator.avatar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={creator.avatar}
                  alt="avatar"
                  className="w-16 h-16 object-cover rounded-full border"
                />
              </div>
            )}

            <div className="mt-2">
              {creator.reviews?.length > 0 ? (
                <>
                  <StarRatings
                    rating={
                      creator.reviews.reduce((acc, r) => acc + r.rating, 0) /
                      creator.reviews.length
                    }
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="2px"
                    name={`rating-${creator.id}`}
                  />
                  <div className="text-xs text-gray-500">
                    ({creator.reviews.length} reviews)
                  </div>
                </>
              ) : (
                <div className="text-xs text-gray-500">⭐ No reviews yet</div>
              )}
            </div>

            {creator.reviewPreview && (
              <p className="text-sm text-gray-700 italic mt-1 truncate">
                “{creator.reviewPreview}...”
              </p>
            )}

            <div className="mt-2 flex gap-2 flex-wrap">
              {creator.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="text-center py-6 text-gray-400">
          Loading more creators...
        </div>
      )}
    </div>
  );
}
