import React from "react";

export default function DigitalIdModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-outline-variant/30 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Digital ID Card Surface */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-inverse-surface via-[#1a233a] to-[#283044] text-white shadow-xl relative overflow-hidden border border-white/10">
          {/* Hologram sheen line */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[22px]">school</span>
              <span className="font-headline font-bold text-sm tracking-tight text-white">CampusConnect</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVE ID
            </span>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/40 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </span>
            </div>

            <h3 className="font-headline font-bold text-lg text-white mt-3">{student.name}</h3>
            <p className="text-xs text-secondary-fixed font-semibold">{student.program}</p>
            <p className="text-[11px] text-surface-variant/70 mt-0.5">{student.cohort} • {student.honors}</p>

            <div className="mt-4 w-full grid grid-cols-2 gap-2 text-left bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
              <div>
                <span className="text-[10px] uppercase text-surface-variant/60 block">Student ID</span>
                <span className="font-mono font-bold text-white">{student.id}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-surface-variant/60 block">Status</span>
                <span className="font-bold text-emerald-300">Enrolled (Good Standing)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-surface-variant/60 block">Activity Credits</span>
                <span className="font-bold text-white">{student.creditsEarned} / {student.creditsRequired} Req.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-surface-variant/60 block">Valid Thru</span>
                <span className="font-bold text-white">June 2026</span>
              </div>
            </div>

            {/* Barcode Mock */}
            <div className="mt-5 w-full pt-3 border-t border-white/10 flex flex-col items-center">
              <div className="h-8 w-4/5 bg-[repeating-linear-gradient(90deg,#ffffff_0px,#ffffff_2px,transparent_2px,transparent_4px,#ffffff_4px,#ffffff_7px,transparent_7px,transparent_10px)] opacity-90 rounded"></div>
              <span className="font-mono text-[10px] text-surface-variant/80 mt-1 tracking-widest">{student.id}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-on-surface-variant">
          Tap anywhere or show this digital credential at campus dining halls, university libraries, and event turnstiles.
        </p>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors"
        >
          Dismiss ID
        </button>
      </div>
    </div>
  );
}
