import { useEffect, useState } from "react";

export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish(); // Hide splash after 2s
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    visible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <img
          src="/spicyrate-horizontal-logo.png"
          alt="SpicyRate Splash"
          className="w-64 sm:w-72 md:w-80 animate-pulse"
        />
      </div>
    )
  );
}
