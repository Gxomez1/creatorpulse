import { useEffect } from "react";
import Image from "next/image";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.(); // Optional chaining avoids crash if onFinish is undefined
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-[#e11d48]">
      <Image
        src="/creator-icon.png"
        alt="Creator Pulse Splash"
        width={64}
        height={64}
        className="mb-4"
      />
      <h1 className="text-xl font-bold">Creator Pulse</h1>
    </div>
  );
}
