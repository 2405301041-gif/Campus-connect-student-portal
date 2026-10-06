import React, { useState } from "react";
import { createEvent } from "../services/api";

export default function HostEventModal({ isOpen, onClose, onEventCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "tech",
    date: "",
    time: "",
    venue: "",
    prizePool: "",
    format: "In-Person",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.venue) {
      setError("Please fill out Title, Date, and Venue.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newEv = await createEvent(formData);
      if (onEventCreated) onEventCreated(newEv);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-xl p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface">Host Campus Event</h3>
              <p className="text-xs text-on-surface-variant">Publish a sanctioned activity to the university directory</p>
            </div>
          </div>
          <button
            onClick={onClose}
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Quad Robotics Sprint 2025"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Subtitle / Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. 24h Autonomous System Hackathon"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="tech">Tech & Hackathons</option>
                <option value="cultural">Cultural & Arts</option>
                <option value="sports">Sports & Athletics</option>
                <option value="academic">Academic & Research</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Event Format
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Date *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. May 10, 2025"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Time
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM – 04:00 PM EST"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Campus Venue *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Turing Hall Auditorium"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Prize Pool (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. $2,500"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Outline what participants will do, prerequisites, and key highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
