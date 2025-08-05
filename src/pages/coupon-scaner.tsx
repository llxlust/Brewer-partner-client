import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        if (!isTriggered) {
          setScannedUrl(result.data);
          triggerAction(result.data);
          setIsTriggered(true);
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scanner.start();

    return () => {
      scanner.stop();
    };
  }, [isTriggered]);

  const triggerAction = async (url: string) => {
    try {
      const res = await fetch(url, { method: "POST" });
      const text = await res.text();
      alert(`✅ Triggered: ${url}\n\nResponse: ${text}`);
    } catch (err) {
      alert(`❌ Failed to trigger: ${url}`);
      console.error(err);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <video ref={videoRef} className="w-full h-full " playsInline muted />

      {/* Overlay UI */}
      <div className="absolute top-0 left-0 w-full p-4 text-white z-10">
        <h1 className="text-xl font-semibold">📷 สแกน QR คูปอง</h1>
      </div>

      {scannedUrl && (
        <div className="absolute bottom-4 left-0 w-full text-center text-green-400 z-10">
          🔗 สแกนแล้ว: {scannedUrl}
        </div>
      )}
    </div>
  );
}
