import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile device
  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  useEffect(() => {
    if (!isMobile || !videoRef.current) return;

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
  }, [isTriggered, isMobile]);

  const triggerAction = async (url: string) => {
    try {
      alert(`✅ Triggered: ${url}`);
    } catch (err) {
      alert(`❌ Failed to trigger: ${url}`);
      console.error(err);
    }
  };

  // ✅ fallback UI
  if (!isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-center text-gray-600 text-lg">
          ❌ เปิดกล้องได้เฉพาะบนมือถือเท่านั้น
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-screen"
      style={{ height: `${window.innerHeight}px` }} // ✅ Fix full height on mobile
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        muted
      />

      <div className="absolute top-0 left-0 w-full p-4 text-white z-10 bg-gradient-to-b from-black/60 to-transparent">
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
