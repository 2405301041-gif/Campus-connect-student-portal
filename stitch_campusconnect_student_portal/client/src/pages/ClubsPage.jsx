import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { createClub } from "../services/api";

export default function ClubsPage({ clubs = [], onToggleJoinClub, onClubCreated }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubCategory, setNewClubCategory] = useState("technical");
  const [newClubLead, setNewClubLead] = useState("");
  const [newClubDesc, setNewClubDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "all", label: "All (64)" },
    { id: "technical", label: "Technical & Coding" },
    { id: "cultural", label: "Cultural & Arts" },
    { id: "literary", label: "Literary & Debate" },
    { id: "sports", label: "Sports & Fitness" },
    { id: "social", label: "Social Service & NGO" },
    { id: "entrepreneurship", label: "Entrepreneurship" },
  ];

  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    if (activeCategory !== "all") {
      result = result.filter((c) => c.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.leadOrganizer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [clubs, activeCategory, searchTerm]);

  const handleCharterSubmit = async (e) => {
    e.preventDefault();
    if (!newClubName) return;

    try {
      setLoading(true);
      const cl = await createClub({
        name: newClubName,
        category: newClubCategory,
        leadOrganizer: newClubLead || "Maya Lin",
        shortDesc: newClubDesc,
        tags: ["Collegiate Chapter", "Student-Led"]
      });
      if (onClubCreated) onClubCreated(cl);
      setShowCharterModal(false);
      setNewClubName("");
      setNewClubDesc("");
    } catch (err) {
      alert(err.message || "Failed to charter club");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24">
      {/* Header Banner */}
      <section className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Official University Organizations
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
            Student Clubs, Chapters & Societies
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Explore student-led innovation, artistic expression, athletic rigor, and social leadership across 60+ active collegiate chapters.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center px-4 py-3 bg-surface-container rounded-2xl shadow-sm border border-outline-variant/30">
            <span className="font-headline font-bold text-xl text-primary mr-2">64</span>
            <span className="text-xs text-on-surface-variant leading-tight">
              Registered<br />Societies
            </span>
          </div>
          <div className="flex items-center px-4 py-3 bg-surface-container rounded-2xl shadow-sm border border-outline-variant/30">
            <span className="font-headline font-bold text-xl text-tertiary mr-2">4.8k</span>
            <span className="text-xs text-on-surface-variant leading-tight">
              Active<br />Members
            </span>
          </div>
          <button
            onClick={() => setShowCharterModal(true)}
            className="h-12 px-5 rounded-2xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Register New Club</span>
          </button>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 border border-outline-variant/30 shadow-sm mb-10 space-y-4">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search by society name, technology, domain or lead organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 p-1 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-surface-container-high/60 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === c.id
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${club.logoBg} text-white flex items-center justify-center shadow-md flex-shrink-0`}
                >
                  <span className="material-symbols-outlined text-[28px]">{club.icon}</span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                    {club.categoryLabel}
                  </span>
                  <span className="block text-[11px] text-outline mt-1 font-medium">Est. {club.founded}</span>
                </div>
              </div>

              <h3 className="font-headline font-bold text-lg text-on-surface mt-4">{club.name}</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{club.shortDesc}</p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mt-3">
                {club.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface-variant text-[10px] font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-container-high space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant">
                <div>
                  <span className="text-[10px] text-outline block">Meetings</span>
                  <span className="font-semibold text-on-surface">{club.meetingTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">Location</span>
                  <span className="font-semibold text-on-surface">{club.room}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-primary">{club.membersCount} Active Members</span>
                <button
                  onClick={() => onToggleJoinClub(club.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    club.isJoined
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-primary text-white hover:bg-primary-container"
                  }`}
                >
                  {club.isJoined ? "Member ✓" : "Join Society"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charter Modal */}
      {showCharterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-6 shadow-2xl border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="font-headline font-bold text-base text-on-surface">Charter New Society</h3>
              <button onClick={() => setShowCharterModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCharterSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Club Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Bio-Engineering Guild"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Category
                </label>
                <select
                  value={newClubCategory}
                  onChange={(e) => setNewClubCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="technical">Technical & Coding</option>
                  <option value="cultural">Cultural & Arts</option>
                  <option value="literary">Literary & Debate</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="social">Social Service & NGO</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Lead Organizer / Faculty Advisor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin (Student Lead)"
                  value={newClubLead}
                  onChange={(e) => setNewClubLead(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your student society's goals, workshops, and activities..."
                  value={newClubDesc}
                  onChange={(e) => setNewClubDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCharterModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container"
                >
                  {loading ? "Registering..." : "Submit Charter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
