export async function cropImage(imageSrc, croppedAreaPixels) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // ✅ ensure CORS-safe for canvas
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const { width, height } = croppedAreaPixels;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  // ✅ ALWAYS RETURN BASE64
  const base64 = canvas.toDataURL("image/jpeg", 0.9);
  return base64;
}
