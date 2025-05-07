import { useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const avatars = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
];

const tagsList = [
  "Latina", "Blonde", "Thick", "Gamer", "Redhead", "MILF", "Petite", "Cosplay", "Tattooed"
];

const sampleReviews = [
  { rating: 5, text: "🔥 Absolutely stunning, worth every second!" },
  { rating: 4, text: "Super sweet and engaging, would recommend." },
  { rating: 5, text: "🔥🔥🔥 queen energy all the way" },
  { rating: 3, text: "Cute but not super interactive." },
  { rating: 5, text: "Hands down one of the best profiles!" },
];

export default function SeedPage() {
  useEffect(() => {
    const seedData = async () => {
      for (let i = 1; i <= 15; i++) {
        const name = `Creator ${i}`;
        const avatar = avatars[i % avatars.length];
        const tags = [tagsList[i % tagsList.length], tagsList[(i + 3) % tagsList.length]];
        const bio = `I'm ${name}, here to spice up your feed 💋`;

        const creatorRef = await addDoc(collection(db, "creators"), {
          name,
          avatar,
          bio,
          tags,
          trending: i % 4 === 0, // every 4th creator is trending
          instagram: "https://instagram.com/fakeuser",
          onlyfans: "https://onlyfans.com/fakeuser",
          createdAt: new Date(),
        });

        // Add 2 random reviews
        await Promise.all([
          addDoc(collection(db, `creators/${creatorRef.id}/reviews`), sampleReviews[Math.floor(Math.random() * sampleReviews.length)]),
          addDoc(collection(db, `creators/${creatorRef.id}/reviews`), sampleReviews[Math.floor(Math.random() * sampleReviews.length)])
        ]);
      }

      alert("✅ 15 creators seeded! You can now return to the homepage.");
    };

    seedData();
  }, []);

  return (
    <div className="p-8 text-center text-xl font-bold">
      Seeding creators... Check Firestore + homepage
    </div>
  );
}
