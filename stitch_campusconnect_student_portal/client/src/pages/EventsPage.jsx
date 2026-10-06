import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function EventsPage({
  events = [],
  onSelectEventToRegister,
  onToggleBookmark
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [sortBy, setSortBy] = useState("soonest");

  const categories = [
    { id: "all", label: "All Events" },
    { id: "tech", label: "Tech & Hackathons" },
    { id: "cultural", label: "Cultural & Arts" },
    { id: "sports", label: "Sports & Athletics" },
    { id: "academic", label: "Academic & Research" },
  ];

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (activeCategory !== "all") {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (selectedFormat !== "all") {
      result = result.filter((e) => e.format.toLowerCase() === selectedFormat.toLowerCase());
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.leadOrganizer.toLowerCase().includes(q)
      );
    }

    if (sortBy === "spots") {
      result.sort((a, b) => a.spotsRemaining - b.spotsRemaining);
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.registeredCount - a.registeredCount);
    }

    return result;
  }, [events, activeCategory, selectedFormat, searchTerm, sortBy]);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24">
      {/* Breadcrumb & Semester Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-surface-container-high">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-bold">Campus Events Directory</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold text-primary">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span>Spring 2025 Calendar Active</span>
        </div>
      </div>

      {/* Directory Hero Banner */}
      <section className="mt-6 mb-8 rounded-3xl bg-gradient-to-br from-surface-container to-surface-container-low p-6 sm:p-10 border border-outline-variant/30 relative overflow-hidden shadow-sm">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Official University Discovery Board
            </div>
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              Campus Events Directory
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Explore hackathons, annual cultural fests, student club workshops, and athletic matches. Register for passes, form teams, and earn graduation activity credits.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-2xl border border-outline-variant/30 text-center shadow-sm">
            <div className="px-3 py-1">
              <div className="font-headline font-extrabold text-xl sm:text-2xl text-primary">{events.length}</div>
              <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Live Events</div>
            </div>
            <div className="px-3 py-1 border-l border-surface-container-high">
              <div className="font-headline font-extrabold text-xl sm:text-2xl text-tertiary">$34.5k</div>
              <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Prize Pools</div>
            </div>
            <div className="px-3 py-1 border-l border-surface-container-high">
              <div className="font-headline font-extrabold text-xl sm:text-2xl text-secondary">6.5k</div>
              <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters & Search Bar */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 border border-outline-variant/30 shadow-sm space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by title, club, venue, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Format Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="all">Format: All Formats</option>
              <option value="in-person">In-Person Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="virtual">Virtual</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="soonest">Sort: Soonest Date</option>
              <option value="spots">Sort: Limited Spots Remaining</option>
              <option value="popular">Sort: Most Popular</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
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

      {/* Events Results Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 space-y-3">
          <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
          <h3 className="font-headline font-bold text-lg text-on-surface">No events found</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchTerm("");
              setSelectedFormat("all");
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ev.bannerImage}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-bold text-primary uppercase tracking-wider">
                    {ev.categoryLabel}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onToggleBookmark) onToggleBookmark(ev.id);
                    }}
                    className="p-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary transition-colors"
                    title={ev.isBookmarked ? "Remove Bookmark" : "Bookmark Event"}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: ev.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Date & Format Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    {ev.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px]">
                    {ev.format}
                  </span>
                </div>
              </div>

              {/* Event Details Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-headline font-bold text-base text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link>
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {ev.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="space-y-1.5 pt-2 border-t border-surface-container-high text-xs text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                      <span className="truncate max-w-[150px]">{ev.venue}</span>
                    </span>
                    <span className="font-bold text-primary">{ev.prizePool !== "$0" ? ev.prizePool : "Free Entry"}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-outline">Spots: {ev.spotsRemaining} left</span>
                    <span className="text-emerald-600 font-semibold">{ev.registeredCount} Attending</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectEventToRegister(ev)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                  >
                    {ev.isRegistered ? "Pass Registered ✓" : "Register Pass"}
                  </button>
                  <Link
                    to={`/events/${ev.id}`}
                    className="px-3 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Details</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
