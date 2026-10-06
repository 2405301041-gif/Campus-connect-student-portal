import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPaletteModal({ isOpen, onClose, events = [], clubs = [], onOpenId, onOpenCheckIn, onOpenHost }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger handled in parent or here
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: "View Digital Student ID", icon: "badge", action: () => { onClose(); onOpenId(); } },
    { label: "Quick QR Check-In", icon: "qr_code_scanner", action: () => { onClose(); onOpenCheckIn(); } },
    { label: "Host a New Campus Event", icon: "add_circle", action: () => { onClose(); onOpenHost(); } },
    { label: "Go to Student Dashboard", icon: "space_dashboard", action: () => { onClose(); navigate("/dashboard"); } },
    { label: "Browse Official Circulars", icon: "campaign", action: () => { onClose(); navigate("/announcements"); } },
    { label: "Contact Student Affairs Desk", icon: "support_agent", action: () => { onClose(); navigate("/contact"); } },
  ];

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredClubs = clubs.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl shadow-2xl border border-outline-variant/30 overflow-hidden">
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-surface-container-high gap-3">
          <span className="material-symbols-outlined text-outline text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search events, clubs, societies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[11px]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {!query && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 mb-2 block">
                Quick Actions
              </span>
              <div className="space-y-1">
                {quickActions.map((qa) => (
                  <button
                    key={qa.label}
                    onClick={qa.action}
                    className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-surface-container-low text-left text-xs font-semibold text-on-surface transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">{qa.icon}</span>
                    </div>
                    <span>{qa.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 mb-2 block">
                Campus Events ({filteredEvents.length})
              </span>
              <div className="space-y-1">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      onClose();
                      navigate(`/events/${ev.id}`);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">event</span>
                      <span className="text-xs font-bold text-on-surface">{ev.title}</span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">{ev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clubs */}
          {filteredClubs.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 mb-2 block">
                Clubs & Societies ({filteredClubs.length})
              </span>
              <div className="space-y-1">
                {filteredClubs.map((cl) => (
                  <div
                    key={cl.id}
                    onClick={() => {
                      onClose();
                      navigate(`/clubs`);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">groups</span>
                      <span className="text-xs font-bold text-on-surface">{cl.name}</span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">{cl.membersCount} members</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredEvents.length === 0 && filteredClubs.length === 0 && (
            <div className="py-8 text-center text-xs text-on-surface-variant">
              No matching events or societies found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
