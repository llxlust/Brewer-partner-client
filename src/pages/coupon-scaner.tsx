import { useContext, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../stores/context";
import Swal from "sweetalert2";
import { useCoupon } from "../hooks/useCoupon";

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const isTriggeredRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setIsLoader } = useContext(SessionContext);
  const { redeemCoupon } = useCoupon();
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
        if (!isTriggeredRef.current) {
          isTriggeredRef.current = true;
          setScannedUrl(result.data);
          triggerAction(result.data);
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
  }, [isMobile]);

  const triggerAction = async (url: string) => {
    try {
      setIsLoader(true);
      const res = await redeemCoupon(url);
      if (!res.success) {
        Swal.fire({
          icon: "error",
          title: res.data,
        }).then((result) => {
          if (result.isDismissed || result.isConfirmed) {
            isTriggeredRef.current = false;
          }
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: res.data,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isDismissed || result.isConfirmed) {
          isTriggeredRef.current = false;
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Invalid Qrcode",
      }).then((result) => {
        if (result.isDismissed || result.isConfirmed) {
          isTriggeredRef.current = false;
        }
      });
    } finally {
      setIsLoader(false);
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
      className="relative w-full h-[100svh]"
      // ✅ Fix full height on mobile
    >
      <h1 className="text-3xl pb-3">Coupon scanner</h1>
      <video
        ref={videoRef}
        className="w-full aspect-square object-cover rounded-md border-1 border-gray-300"
        playsInline
        muted
      />

      {scannedUrl && (
        <div className="absolute bottom-4 left-0 w-full text-center text-green-400 z-10">
          🔗 สแกนแล้ว: {scannedUrl}
        </div>
      )}
    </div>
  );
}
