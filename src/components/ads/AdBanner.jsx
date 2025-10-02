// src/components/AdBanner.jsx
import { useEffect } from "react";

export default function AdBanner({ slot = "4133209058", format = "auto", responsive = true }) {
  useEffect(() => {
    if (import.meta.env.PROD) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  // ✅ In development → show placeholder
  if (import.meta.env.DEV) {
    return (
      <div
        className="flex items-center justify-center border border-dashed border-gray-400 rounded-lg bg-gray-50 text-gray-500 text-sm"
        style={{ width: "100%", height: "120px" }}
      >
        🅰️ Ad Placeholder (slot: {slot})
      </div>
    );
  }

  // ✅ In production → show real AdSense
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2342961885465890"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    ></ins>
  );
}
