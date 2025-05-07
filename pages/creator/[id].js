import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import StarRatings from "react-star-ratings";

export default function CreatorPage() {
  const router = useRouter();
  const { id } = router.query;
  const [creator, setCreator] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sortType, setSortType] = useState("most-liked");

  useEffect(() => {
    if (!id) return;
    fetchCreatorData();
  }, [id]);

  const fetchCreatorData = async () => {
    const creatorRef = doc(db, "creators", id);
    const creatorSnap = await getDoc(creatorRef);

    if (creatorSnap.exists()) {
      const data = creatorSnap.data();
      data.id = creatorSnap.id;

      const reviewSnap = await getDocs(collection(db, "creators", id, "reviews"));
      const reviewData = reviewSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCreator(data);
      setReviews(reviewData);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newRating || !newText.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "creators", id, "reviews"), {
        rating: newRating,
        text: newText.trim(),
        createdAt: new Date(),
        likes: 0,
      });
      setNewRating(0);
      setNewText("");
      fetchCreatorData();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleLike = async (reviewId) => {
    const storageKey = `liked_${id}_${reviewId}`;
    if (localStorage.getItem(storageKey)) {
      alert("You already liked this review.");
      return;
    }

    try {
      const reviewRef = doc(db, "creators", id, "reviews", reviewId);
      await updateDoc(reviewRef, {
        likes: increment(1),
      });
      localStorage.setItem(storageKey, "true");
      fetchCreatorData();
    } catch (err) {
      console.error("Failed to like review:", err);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "most-liked") {
      return (b.likes || 0) - (a.likes || 0);
    } else if (sortType === "newest") {
      return (
        new Date(b.createdAt?.toDate?.() || b.createdAt) -
        new Date(a.createdAt?.toDate?.() || a.createdAt)
      );
    } else if (sortType === "top-rated") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  if (!creator) return <div className="p-6">Loading...</div>;

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 🔙 Creator Info */}
      <div className="flex items-center gap-4 mb-4">
        {creator.avatar && (
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-20 h-20 rounded-full object-cover border"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{creator.name}</h1>
          <p className="text-sm text-gray-600">{creator.bio}</p>
          {reviews.length > 0 && (
            <div className="mt-2">
              <StarRatings
                rating={averageRating}
                starRatedColor="#facc15"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                name="rating"
              />
              <p className="text-sm text-gray-500">
                ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </p>
            </div>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            {creator.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ✍️ Submit Review */}
      <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Your Rating:</label>
          <StarRatings
            rating={newRating}
            changeRating={(value) => setNewRating(value)}
            starRatedColor="#facc15"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="5px"
            name="newRating"
          />
        </div>
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Write your review..."
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* 💬 Reviews */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Reviews</h2>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="text-sm border p-1 rounded"
          >
            <option value="most-liked">🔥 Most Liked</option>
            <option value="newest">🕒 Newest</option>
            <option value="top-rated">⭐ Top Rated</option>
          </select>
        </div>

        {sortedReviews.map((review) => (
          <div key={review.id} className="border-t py-3 space-y-1">
            <StarRatings
              rating={review.rating}
              starRatedColor="#facc15"
              numberOfStars={5}
              starDimension="18px"
              starSpacing="2px"
              name={`rating-${review.id}`}
            />
            <p>{review.text}</p>
            <button
              onClick={() => handleLike(review.id)}
              className="text-sm text-red-500 hover:underline"
            >
              🔥 {review.likes || 0} likes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
