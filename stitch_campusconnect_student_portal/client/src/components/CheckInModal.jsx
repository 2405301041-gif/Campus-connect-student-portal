import React, { useState } from "react";
import { verifyCheckIn } from "../services/api";

export default function CheckInModal({ isOpen, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateScan = async () => {
    setScanning(true);
    setTimeout(async () => {
      try {
        const res = await verifyCheckIn("QR-EVENT-INNOVATION-QUAD");
        setResult(res);
      } catch (err) {
        console.error(err);
      } finally {
        setScanning(false);
      }
    }, 1200);
  };

  const handleClose = () => {
    setResult(null);
    setScanning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-outline-variant/30 text-center relative overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[26px]">qr_code_scanner</span>
        </div>

        <h3 className="font-headline font-bold text-lg text-on-surface">Quick Event Check-In</h3>
        <p className="text-xs text-on-surface-variant mt-1">Scan terminal at venue doors or check in via student pass</p>

        {!result ? (
          <div className="mt-5 space-y-4">
            {/* Viewfinder Mock */}
            <div className="relative mx-auto w-52 h-52 rounded-2xl bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-dashed border-primary">
              {scanning ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-primary animate-pulse">Verifying Attendance...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <span className="material-symbols-outlined text-[48px] text-primary/70">qr_code_2</span>
                  <span className="text-xs text-on-surface-variant font-medium">Position event terminal QR code within viewfinder</span>
                </div>
              )}
              {/* Laser line effect */}
              {scanning && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-bounce"></div>
              )}
            </div>

            <button
              onClick={handleSimulateScan}
              disabled={scanning}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {scanning ? "Scanning..." : "Simulate Instant Check-In"}
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Check-In Approved</span>
              <h4 className="font-headline font-bold text-base text-on-surface mt-1">{result.student.name}</h4>
              <p className="text-xs text-on-surface-variant">{result.student.id} • {result.student.cohort}</p>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Gate:</span>
                <span className="font-semibold text-on-surface">{result.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Timestamp:</span>
                <span className="font-semibold text-on-surface">{result.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Status:</span>
                <span className="font-semibold text-emerald-600">Attendance Logged</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
