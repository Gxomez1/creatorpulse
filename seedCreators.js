// ✅ Proper CommonJS setup for Node
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

// ✅ Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// ✅ 25 Fake Creators
const creators = [
  {
    name: "Luna Vee",
    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    bio: "Uplifting content with lots of charm and elegance.",
    tags: ["Influencer", "Beauty", "Trending"],
    trending: true,
  },
  {
    name: "Dax Orion",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Tech-focused and charismatic content creator.",
    tags: ["Tech-Savvy", "Professional"],
    trending: false,
  },
  {
    name: "Mira Blaze",
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    bio: "Fashion-forward style, always on point.",
    tags: ["Fashion", "Model", "Minimalist"],
    trending: true,
  },
  {
    name: "Nova Rain",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    bio: "Soft elegance mixed with daily vlogs.",
    tags: ["Student", "Wellness", "Lifestyle"],
    trending: true,
  },
  {
    name: "Elias Storm",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    bio: "Strong edits and great viewer connection.",
    tags: ["Vlogger", "Creative", "Coach"],
    trending: false,
  },
  {
    name: "Aria Skye",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Elegant style with minimalist vibes.",
    tags: ["Model", "Minimalist", "Trending"],
    trending: true,
  },
  {
    name: "Kai Zen",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Lifestyle & travel with peaceful visuals.",
    tags: ["Travel", "Creative", "Wellness"],
    trending: false,
  },
  {
    name: "Selene Rose",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Fitness and empowerment through movement.",
    tags: ["Fitness", "Professional", "Trending"],
    trending: true,
  },
  {
    name: "Leo Banks",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    bio: "Mentor content with high-value breakdowns.",
    tags: ["Mentor", "Coach", "Entrepreneur"],
    trending: false,
  },
  {
    name: "Ava Luna",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    bio: "Elegant visuals and romantic aesthetics.",
    tags: ["Beauty", "Influencer", "Creative"],
    trending: true,
  },
  {
    name: "Jax Nova",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    bio: "Always dropping game-changing content.",
    tags: ["Professional", "Tech-Savvy"],
    trending: false,
  },
  {
    name: "Zoe Moon",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Yoga, healing, and holistic living.",
    tags: ["Wellness", "Coach", "Fitness"],
    trending: true,
  },
  {
    name: "Finn Wilder",
    avatar: "https://randomuser.me/api/portraits/men/26.jpg",
    bio: "Storyteller with a raw documentary style.",
    tags: ["Content Creator", "Vlogger"],
    trending: false,
  },
  {
    name: "Isla Belle",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    bio: "Soft glam and fashion-forward reels.",
    tags: ["Influencer", "Fashion"],
    trending: true,
  },
  {
    name: "Ash Orion",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    bio: "Bold edits with high impact visuals.",
    tags: ["Creative", "Entrepreneur"],
    trending: false,
  },
  {
    name: "Skye Ever",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    bio: "Wellness, balance, and peace-driven content.",
    tags: ["Wellness", "Professional"],
    trending: false,
  },
  {
    name: "Nico Rhodes",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    bio: "From workout tips to business mindset hacks.",
    tags: ["Fitness", "Coach", "Trending"],
    trending: true,
  },
  {
    name: "Lyra Storm",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    bio: "Cosmic vibes and soft aesthetics daily.",
    tags: ["Beauty", "Creative"],
    trending: false,
  },
  {
    name: "Troy Vale",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    bio: "High-performing productivity content.",
    tags: ["Entrepreneur", "Tech-Savvy"],
    trending: false,
  },
  {
    name: "Sage Bloom",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    bio: "Clean, serene, and perfectly minimal.",
    tags: ["Minimalist", "Fashion"],
    trending: true,
  },
  {
    name: "Orion Lux",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    bio: "Cinematic edits with a motivational edge.",
    tags: ["Content Creator", "Coach"],
    trending: false,
  }
];

async function seed() {
  const batch = db.batch();
  creators.forEach((creator) => {
    const docRef = db.collection("creators").doc();
    batch.set(docRef, creator);
  });
  await batch.commit();
  console.log("✅ 25 Fake Creators added successfully.");
}

seed();
