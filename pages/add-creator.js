import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Cropper from "react-easy-crop";
import { cropImage } from "../utils/cropImage";
import { dataURLtoBlob } from "../utils/dataURLtoBlob";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { db } from "../utils/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import imageCompression from "browser-image-compression";


const allowedTags = [
  // Platform Verification Tags
   "OnlyFans Verified",
   "PH Verified",
   "Cam Verified",
    // Status Tags
   "Top Creator",
   "Top 0.1%",
   "Popular",
   "Retired",
    // Body Type Tags
   "Petite",
   "Curvy",
   "Thick",
   "Thick Thighs",
   "Busty",
   "Big Tits",
   "Big Ass",
   "Booty Queen",
    // Ethnicity & Appearance Tags
   "Latina",
   "Ebony",
   "Asian",
   "Exotic",
   "Middle Eastern",
   "Blonde",
   "Brunette",
   "Redhead",
   "Tattoos",
   "Piercings",
   "Tall",
    // Style & Vibe Tags
   "Natural",
   "Fitness",
   "Fitness Model",
   "Influencer",
   "Glamorous",
   "Elegant",
   "Yoga Pants",
   "Gamer Girl",
   "Wild",
   "Energy",
   "Sensual",
   "Seductive",
   "Shy Girl",
   "MILF",
    // Content Type Tags
   "Softcore",
   "Hardcore",
   "Amateur",
   "Professional",
   "Solo",
   "Girl/Girl",
   "Solo Content",
   "Couple Content",
   "Public",
   "Public Play",
    // Fantasy / Persona Tags
   "Mommy",
   "Teacher",
   "Nurse",
   "Cheerleader",
   "College Girl",
   "Party Girl",
   "Nerdy",
   "Submissive",
   "Dominatrix",
   "Cosplay",
   "First Timer",
    // Fetish & Niche Tags
   "Dirty Talk",
   "Teasing",
   "Feet",
   "BDSM",
   "GFE",
   "Roleplay",
   "ASMR",
   "JOI"
 ];


export default function AddCreatorPage() {
 const [name, setName] = useState("");
 const [bio, setBio] = useState("");
 const [tags, setTags] = useState([]);
 const [tagInput, setTagInput] = useState("");
 const [imageSrc, setImageSrc] = useState(null);
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const [zoom, setZoom] = useState(1.2);
 const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
 const [croppedImage, setCroppedImage] = useState(null);
 const [submitting, setSubmitting] = useState(false);
 const [trending, setTrending] = useState(false);


 const router = useRouter();


 const onCropComplete = useCallback((_, croppedPixels) => {
   setCroppedAreaPixels(croppedPixels);
 }, []);


 const handleImageUpload = async (e) => {
   const file = e.target.files[0];
   if (!file) return;


   try {
     const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
     const compressedFile = await imageCompression(file, options);
     const imageDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
     setImageSrc(imageDataUrl);
     setZoom(1.2);
   } catch (err) {
     console.error("❌ Image compression error:", err);
     alert("Image compression failed. Try another image.");
   }
 };


 const handleCropSave = async () => {
   try {
     const croppedImg = await cropImage(imageSrc, croppedAreaPixels);
     setCroppedImage(croppedImg);
     setImageSrc(null);
     console.log("✅ Cropped image saved.");
   } catch (err) {
     console.error("❌ Error cropping image:", err);
   }
 };


 const addTag = () => {
   if (tagInput && !tags.includes(tagInput)) {
     setTags([...tags, tagInput]);
   }
   setTagInput("");
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!name.trim() || !croppedImage) {
     alert("Please enter a name and crop the image first!");
     return;
   }


   if (submitting) return;
   setSubmitting(true);


   try {
     const q = query(collection(db, "creators"), where("name", "==", name));
     const snapshot = await getDocs(q);
     if (!snapshot.empty) {
       alert("Creator already exists!");
       setSubmitting(false);
       return;
     }


     let blob = dataURLtoBlob(croppedImage);
     if (!blob || blob.size === 0) {
       alert("The cropped image is empty or failed.");
       setSubmitting(false);
       return;
     }


     let downloadURL = await uploadToCloudinary(blob);


     await addDoc(collection(db, "creators"), {
       name,
       avatar: downloadURL,
       bio,
       tags,
       trending,
     });


     alert("🔥 Creator added successfully!");
     router.push("/");
   } catch (err) {
     console.error("❌ Upload error:", err);
     alert("Upload failed: " + (err.message || "Unknown error"));
   } finally {
     setSubmitting(false);
   }
 };


 return (
   <div className="max-w-2xl mx-auto p-6">
     <h1 className="text-2xl font-bold mb-6 text-red-600">Add New Creator</h1>
     <form onSubmit={handleSubmit} className="space-y-6">
       <input
         type="text"
         placeholder="Creator's Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="border p-2 rounded w-full"
         required
       />


       {croppedImage ? (
         <div className="flex flex-col items-center gap-2">
           <img src={croppedImage} className="w-24 h-24 rounded-full object-cover" />
           <button onClick={() => setCroppedImage(null)} type="button" className="text-xs text-red-500 underline">
             Change Image
           </button>
         </div>
       ) : imageSrc ? (
         <>
           <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
             <Cropper
               image={imageSrc}
               crop={crop}
               zoom={zoom}
               aspect={1}
               onCropChange={setCrop}
               onCropComplete={onCropComplete}
               onZoomChange={setZoom}
               cropShape="round"
               showGrid={false}
             />
           </div>
           <button onClick={handleCropSave} type="button" className="mt-2 bg-black text-white px-4 py-2 rounded w-full">
             Save Crop
           </button>
         </>
       ) : (
         <div className="flex flex-col items-center">
           <label htmlFor="imageUpload" className="cursor-pointer bg-black text-white px-4 py-2 text-sm rounded mb-2 hover:opacity-90">
             Upload Image
           </label>
           <input
             id="imageUpload"
             type="file"
             accept="image/*"
             onChange={handleImageUpload}
             className="hidden"
             required
           />
         </div>
       )}


       <textarea
         placeholder="Short Bio (optional)"
         value={bio}
         onChange={(e) => setBio(e.target.value)}
         className="border p-2 rounded w-full"
       />


       <div>
         <select value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="border p-2 rounded w-full">
           <option value="">Select a Tag</option>
           {allowedTags.map((tag, i) => (
             <option key={i} value={tag}>{tag}</option>
           ))}
         </select>
         <button type="button" onClick={addTag} className="mt-2 bg-black text-white px-3 py-1 rounded text-sm">
           Add Tag
         </button>
       </div>


       <div className="flex flex-wrap gap-2">
         {tags.map((tag, i) => (
           <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
             {tag}
           </span>
         ))}
       </div>


       <div className="flex items-center gap-2 mt-4">
         <input type="checkbox" id="trending" checked={trending} onChange={(e) => setTrending(e.target.checked)} className="w-4 h-4" />
         <label htmlFor="trending" className="text-sm">Mark as Trending 🔥</label>
       </div>


       <button
         type="submit"
         disabled={submitting}
         className={`w-full flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded transition ${
           submitting ? "opacity-50 cursor-not-allowed" : ""
         }`}
       >
         {submitting ? (
           <>
             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
             </svg>
             Submitting...
           </>
         ) : (
           "Add Creator"
         )}
       </button>
     </form>
   </div>
 );
}
