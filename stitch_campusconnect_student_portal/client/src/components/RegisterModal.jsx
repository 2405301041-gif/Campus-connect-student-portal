import React, { useState } from "react";
import confetti from "canvas-confetti";
import { registerForEvent } from "../services/api";

export default function RegisterModal({ event, isOpen, onClose, onRegistered }) {
  const [teamName, setTeamName] = useState("");
  const [participationType, setParticipationType] = useState("solo");
  const [selectedTrack, setSelectedTrack] = useState(event?.tracks?.[0]?.name || "General Innovation Track");
  const [dietary, setDietary] = useState("None");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen || !event) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await registerForEvent(event.id, {
        teamName: participationType === "team" ? teamName : "Solo Participant",
        track: selectedTrack,
        dietary
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not loaded
      }

      setTicket(res.ticket);
      if (onRegistered) onRegistered(event.id);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
        {!ticket ? (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-on-surface">Register for Event</h3>
                  <p className="text-xs text-on-surface-variant truncate max-w-xs">{event.title}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="mt-4 space-y-4">
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="text-xs text-on-surface-variant block">Date & Venue</span>
                  <span className="text-xs font-bold text-on-surface">{event.date} • {event.venue}</span>
                </div>
                <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary-fixed">
                  {event.spotsRemaining} spots left
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Participant Name
                </label>
                <input
                  type="text"
                  disabled
                  value="Maya Lin (ID: CC-2023-8842)"
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-high/60 text-sm font-semibold text-on-surface border border-outline-variant/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Participation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setParticipationType("solo")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      participationType === "solo"
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high"
                    }`}
                  >
                    Solo Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipationType("team")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      participationType === "team"
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high"
                    }`}
                  >
                    Team (1–4 Hackers)
                  </button>
                </div>
              </div>

              {participationType === "team" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quantum Pioneers"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {event.tracks && event.tracks.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Select Track Focus
                  </label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {event.tracks.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.prize})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Dietary / Accessibility Needs
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="None">None / Standard Meals</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Halal">Halal</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  {loading ? "Generating Pass..." : "Confirm Registration"}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Digital Pass Ticket View */
          <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Registration Confirmed</span>
              <h3 className="font-headline font-bold text-xl text-on-surface mt-1">{ticket.eventName}</h3>
            </div>

            {/* Ticket Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-surface-container to-surface-container-low border border-outline-variant/40 text-left space-y-3 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Pass Reference</span>
                  <p className="font-mono text-xs font-bold text-primary">{ticket.ticketCode}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] uppercase">
                  Verified Pass
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Attendee</span>
                  <span className="font-bold text-on-surface">{ticket.attendeeName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Team / Track</span>
                  <span className="font-bold text-on-surface truncate block">{ticket.teamName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Date</span>
                  <span className="font-bold text-on-surface">{ticket.date}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Venue</span>
                  <span className="font-bold text-on-surface">{ticket.venue}</span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="pt-2 flex flex-col items-center justify-center">
                <div className="h-9 w-full bg-[repeating-linear-gradient(90deg,#131b2e_0px,#131b2e_2px,transparent_2px,transparent_4px,#131b2e_4px,#131b2e_8px,transparent_8px,transparent_11px)] opacity-80 rounded"></div>
                <span className="font-mono text-[10px] text-on-surface-variant mt-1 tracking-widest">{ticket.ticketCode}</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant">
              This pass has been added to your Student Dashboard. Show this code or your digital student ID at the check-in desk.
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-container transition-colors"
            >
              Done & Return to Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
