import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage({
  events = [],
  clubs = [],
  announcements = [],
  pulse = {},
  onSelectEventToRegister,
  onToggleJoinClub,
  onOpenHostModal
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/events?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };

  const featuredEvent = events.find((e) => e.id === "hackcampus-2025") || events[0];
  const upcomingEvents = events.slice(0, 3);
  const featuredClubs = clubs.slice(0, 4);
  const latestNotices = announcements.slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Dynamic Hero Banner with Deep Luminescent Ambience */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/40 via-background to-background py-16 md:py-24">
        {/* Atmospheric Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-tertiary/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Live Tag Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-semibold text-xs shadow-sm border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
              <span>Spring Semester 2025 Portal Live</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-medium">Over 24 new clubs onboarded</span>
            </div>

            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-on-surface tracking-tight leading-tight">
              Ignite Your College Journey –{" "}
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary-container bg-clip-text text-transparent">
                Discover, Connect & Excel
              </span>
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Find upcoming campus fests, join 60+ student societies, participate in high-stakes tech hackathons, and never miss an official university circular.
            </p>

            {/* Search & Filter Console Bar */}
            <div className="w-full mt-4 bg-surface-container-lowest shadow-xl rounded-2xl p-4 md:p-5 border border-outline-variant/30 flex flex-col gap-4 text-left">
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Keyword Search */}
                <div className="md:col-span-5 relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
                  <input
                    className="w-full bg-transparent text-on-surface text-sm placeholder:text-outline focus:outline-none"
                    placeholder="Search hackathons, fests, societies, venues..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Select */}
                <div className="md:col-span-4 relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-outline mr-2 text-[20px]">category</span>
                  <select
                    className="w-full bg-transparent text-on-surface text-sm font-semibold focus:outline-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="tech">Tech & Hackathons</option>
                    <option value="cultural">Cultural & Arts</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="academic">Academic & Research</option>
                  </select>
                </div>

                {/* Action Trigger */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white text-sm font-bold shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">explore</span>
                    <span>Explore Events</span>
                  </button>
                </div>
              </form>

              {/* Quick Date Pills & Secondary Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-container-high/60">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-bold uppercase tracking-wider text-outline text-[11px]">Timeline:</span>
                  <button
                    onClick={() => navigate("/events?timeline=today")}
                    className="px-3 py-1 rounded-full bg-primary text-white font-semibold transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigate("/events?timeline=weekend")}
                    className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-semibold transition-colors"
                  >
                    This Weekend
                  </button>
                  <button
                    onClick={() => navigate("/events?timeline=week")}
                    className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-semibold transition-colors"
                  >
                    Next 7 Days
                  </button>
                  <button
                    onClick={() => navigate("/events?timeline=month")}
                    className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-semibold transition-colors"
                  >
                    April 2025
                  </button>
                </div>

                <Link
                  to="/clubs"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-tertiary text-xs font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Browse 60+ Societies</span>
                </Link>
              </div>
            </div>

            {/* Quick Stat Metric Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-6">
              <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-primary">
                  {pulse.activeStudents ? pulse.activeStudents.toLocaleString() + "+" : "12,400+"}
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">
                  Active Students
                </span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-tertiary">
                  {pulse.activeSocieties || "64"}
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">
                  Active Societies
                </span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-secondary">
                  {pulse.annualEvents ? pulse.annualEvents + "+" : "180+"}
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">
                  Annual Events
                </span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center">
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface">
                  {pulse.totalPrizePoolFormatted || "$45K+"}
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">
                  Prize Pools
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Interactive Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-6 mb-16 relative z-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/events"
            className="group relative overflow-hidden bg-surface-container-lowest p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-primary tracking-wider uppercase">Annual Fest Pass</span>
              <h3 className="font-headline font-bold text-base text-on-surface mt-0.5">Register for Campus Fests</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Book early bird passes for Spring Euphoria, hackathons, and varsity athletic games.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-primary text-xs font-bold">
              <span>Explore Fests</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          <Link
            to="/clubs"
            className="group relative overflow-hidden bg-surface-container-lowest p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-tertiary to-tertiary-container text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-tertiary tracking-wider uppercase">Student Societies</span>
              <h3 className="font-headline font-bold text-base text-on-surface mt-0.5">Join a Campus Club</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Explore 60+ student-led chapters in AI, competitive coding, fine arts, and debate.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-tertiary text-xs font-bold">
              <span>View Societies</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          <Link
            to="/announcements"
            className="group relative overflow-hidden bg-surface-container-lowest p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-secondary to-secondary-container text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">campaign</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-secondary tracking-wider uppercase">Official Circulars</span>
              <h3 className="font-headline font-bold text-base text-on-surface mt-0.5">Examination & Deadlines</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Verified notices from Controller of Examinations, Dean of Students, and Grants.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-secondary text-xs font-bold">
              <span>Read Circulars</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="group relative overflow-hidden bg-surface-container-lowest p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">meeting_room</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">Campus Utilities</span>
              <h3 className="font-headline font-bold text-base text-on-surface mt-0.5">Reserve Study Rooms</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Book quiet study pods, media editing suites, and collaborative lab spaces instantly.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-amber-700 text-xs font-bold">
              <span>Book Space</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Flagship Event Spotlight: HackCampus 2025 */}
      {featuredEvent && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16 w-full">
          <div className="relative rounded-3xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-2xl p-6 md:p-10 border border-white/10">
            {/* Background image & gradient overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url(${featuredEvent.bannerImage})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-primary/40 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider">
                    {featuredEvent.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    36h National Sprint
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed font-semibold text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trophy</span>
                    {featuredEvent.prizePool} Bounty Pool
                  </span>
                </div>

                <h2 className="font-headline font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  {featuredEvent.title}: <span className="text-secondary-fixed">{featuredEvent.subtitle}</span>
                </h2>

                <p className="text-sm sm:text-base text-surface-variant/90 max-w-2xl leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase text-surface-variant/60 block">Date</span>
                    <span className="text-xs font-bold text-white">{featuredEvent.date}</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase text-surface-variant/60 block">Venue</span>
                    <span className="text-xs font-bold text-white">{featuredEvent.venue}</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase text-surface-variant/60 block">Spots Remaining</span>
                    <span className="text-xs font-bold text-emerald-300">{featuredEvent.spotsRemaining} spots left</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase text-surface-variant/60 block">Format</span>
                    <span className="text-xs font-bold text-white">{featuredEvent.format}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectEventToRegister(featuredEvent)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Register Team Pass</span>
                  </button>

                  <Link
                    to={`/events/${featuredEvent.id}`}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors flex items-center gap-1.5"
                  >
                    <span>View Event Schedule & Tracks</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Countdown / Stats Tile */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/15 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary-fixed">
                  Registration Window Closes Soon
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/30 p-3 rounded-xl">
                    <span className="font-headline font-bold text-2xl text-white block">04</span>
                    <span className="text-[10px] text-surface-variant/70 uppercase">Days</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl">
                    <span className="font-headline font-bold text-2xl text-white block">18</span>
                    <span className="text-[10px] text-surface-variant/70 uppercase">Hours</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl">
                    <span className="font-headline font-bold text-2xl text-white block">42</span>
                    <span className="text-[10px] text-surface-variant/70 uppercase">Mins</span>
                  </div>
                </div>
                <div className="text-xs text-surface-variant/80 text-left pt-2 space-y-1.5 border-t border-white/10">
                  <div className="flex justify-between">
                    <span>Approved Registrations:</span>
                    <span className="font-bold text-white">{featuredEvent.registeredCount} / {featuredEvent.spotsTotal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary-container to-primary"
                      style={{ width: `${(featuredEvent.registeredCount / featuredEvent.spotsTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Campus Events */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">event_available</span>
              Sanctioned Collegiate Activities
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight">
              Upcoming Campus Events
            </h2>
          </div>
          <Link
            to="/events"
            className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-tertiary text-sm font-bold transition-colors"
          >
            <span>View All ({events.length})</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={ev.bannerImage}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-[11px] font-bold text-primary uppercase">
                  {ev.categoryLabel}
                </span>
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  {ev.date}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-headline font-bold text-base text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link>
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                    <span className="truncate max-w-[130px]">{ev.venue}</span>
                  </span>
                  <span className="font-bold text-primary">{ev.prizePool !== "$0" ? ev.prizePool : "Free Pass"}</span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectEventToRegister(ev)}
                    className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Register Pass
                  </button>
                  <Link
                    to={`/events/${ev.id}`}
                    className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant transition-colors"
                    title="View Details"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Societies Strip */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-tertiary font-bold text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              Student Leadership & Communities
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight">
              Featured Clubs & Chapters
            </h2>
          </div>
          <Link
            to="/clubs"
            className="hidden sm:inline-flex items-center gap-1 text-tertiary hover:text-primary text-sm font-bold transition-colors"
          >
            <span>Explore All Societies ({clubs.length})</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${club.logoBg} text-white flex items-center justify-center shadow-md`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{club.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                    {club.categoryLabel}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-base text-on-surface mt-3">{club.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{club.shortDesc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between">
                <span className="text-xs font-semibold text-on-surface-variant">
                  {club.membersCount} Members
                </span>
                <button
                  onClick={() => onToggleJoinClub(club.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    club.isJoined
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                      : "bg-surface-container-low text-primary hover:bg-surface-container-high border border-primary/20"
                  }`}
                >
                  {club.isJoined ? "Joined ✓" : "Join Club"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Circulars Strip */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">campaign</span>
              <h2 className="font-headline font-bold text-xl text-on-surface">Latest Circulars & Notices</h2>
            </div>
            <Link
              to="/announcements"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Notice Board</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-3">
            {latestNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      notice.urgency === "urgent" ? "text-error" : "text-primary"
                    }`}
                  >
                    {notice.urgency === "urgent" ? "notification_important" : "description"}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-primary">{notice.refCode}</span>
                      <span className="text-[10px] text-on-surface-variant font-medium">• {notice.division}</span>
                      {notice.urgency === "urgent" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-on-surface mt-0.5">{notice.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  <span className="text-xs text-on-surface-variant whitespace-nowrap">{notice.publishedAgo}</span>
                  <Link
                    to="/announcements"
                    className="p-1.5 rounded-lg text-primary hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
