import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventById } from "../services/api";

export default function EventDetailsPage({
  onSelectEventToRegister,
  onToggleBookmark
}) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEventById(id || "hackcampus-2025")
      .then((data) => {
        if (mounted) setEvent(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  const copyEventLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage("Event Link Copied!");
    setTimeout(() => setToastMessage(""), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-on-surface-variant">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-[48px] text-outline">error</span>
        <h2 className="text-xl font-bold text-on-surface">Event Not Found</h2>
        <Link to="/events" className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold inline-block">
          Return to Events Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6 pb-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 right-10 w-80 h-80 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Navigation Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-3 flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>Home
        </Link>
        <span className="text-outline-variant">/</span>
        <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
        <span className="text-outline-variant">/</span>
        <span className="text-outline-variant capitalize">{event.categoryLabel}</span>
        <span className="text-outline-variant">/</span>
        <span className="text-on-surface font-bold truncate max-w-xs">{event.title}</span>
      </nav>

      {/* Marquee Event Hero Header */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-2xl mb-10 border border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-25 pointer-events-none"
          style={{ backgroundImage: `url(${event.bannerImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-primary/40 pointer-events-none"></div>

        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[400px]">
          {/* Top Status & Actions Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                {event.badge}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                {event.time}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                {event.format}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary-fixed text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">trophy</span>
                {event.prizePool} Bounty Pool
              </span>
            </div>

            {/* Utility Micro-Action Buttons */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => onToggleBookmark && onToggleBookmark(event.id)}
                aria-label="Bookmark"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
                title="Save to bookmarks"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: event.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>

              <button
                onClick={copyEventLink}
                aria-label="Share Event"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
                title="Copy share link"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>

              {toastMessage && (
                <div className="absolute -bottom-10 right-0 px-3 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-lg shadow-lg whitespace-nowrap animate-in fade-in">
                  {toastMessage}
                </div>
              )}

              {/* Add to Calendar */}
              <div className="relative">
                <button
                  onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                  className="h-10 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span className="hidden sm:inline">Add to Calendar</span>
                </button>

                {calendarMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-container-lowest text-on-surface shadow-2xl p-1.5 z-30 border border-outline-variant/30">
                    <button
                      onClick={() => {
                        window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=20250328T140000Z/20250330T200000Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`, "_blank");
                        setCalendarMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-surface-container-high text-xs text-left"
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">event</span>
                      <span>Google Calendar</span>
                    </button>
                    <button
                      onClick={() => {
                        alert("iCal .ics event export generated!");
                        setCalendarMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-surface-container-high text-xs text-left"
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">calendar_today</span>
                      <span>Apple iCal (.ics)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero Headline & Core Identity */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-secondary-fixed text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              Registrations Active • Spring 2025 Edition
            </div>
            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-3">
              {event.title}: <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-fixed-dim via-primary-fixed to-tertiary-fixed">
                {event.subtitle}
              </span>
            </h1>
            <p className="text-sm sm:text-base text-surface-variant/90 max-w-2xl leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Hero Meta Badges Deck */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-surface-variant/70">Dates</span>
                <span className="block text-white font-bold text-xs sm:text-sm truncate">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-surface-variant/70">Check-In</span>
                <span className="block text-white font-bold text-xs sm:text-sm truncate">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-surface-variant/70">Venue</span>
                <span className="block text-white font-bold text-xs sm:text-sm truncate">{event.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">military_tech</span>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-surface-variant/70">Bounty Pool</span>
                <span className="block text-emerald-300 font-bold text-xs sm:text-sm truncate">{event.prizePool}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Callout Bar */}
      <section className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 border border-outline-variant/30 shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Registration Pass</span>
            <span className="text-xs text-on-surface-variant">• Free for university students</span>
          </div>
          <p className="text-sm font-bold text-on-surface">
            {event.spotsRemaining} of {event.spotsTotal} seats remaining • Registration open to all undergraduate & grad cohorts
          </p>
          <div className="w-full md:w-96 h-2 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary-container"
              style={{ width: `${(event.registeredCount / event.spotsTotal) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onSelectEventToRegister(event)}
            className="flex-1 md:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>{event.isRegistered ? "Pass Registered (View Ticket)" : "Register Free Pass Now"}</span>
          </button>
        </div>
      </section>

      {/* Grid: Tracks / Timeline / Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Tracks & Timeline */}
        <div className="lg:col-span-8 space-y-10">
          {/* Tracks & Themes */}
          {event.tracks && event.tracks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[24px]">category</span>
                <h2 className="font-headline font-bold text-xl text-on-surface">Competition Tracks & Bounty Bounties</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.tracks.map((track) => (
                  <div
                    key={track.name}
                    className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-headline font-bold text-sm text-on-surface">{track.name}</h3>
                      <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-500/10">
                        {track.prize}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Timeline */}
          {event.timeline && event.timeline.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-tertiary text-[24px]">schedule</span>
                <h2 className="font-headline font-bold text-xl text-on-surface">Event Sprint Schedule</h2>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
                <div className="relative border-l-2 border-primary/30 pl-6 space-y-6">
                  {event.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></span>
                      <span className="text-xs font-bold text-primary block">{item.time}</span>
                      <p className="text-sm font-semibold text-on-surface mt-0.5">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {event.faqs && event.faqs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary text-[24px]">help</span>
                <h2 className="font-headline font-bold text-xl text-on-surface">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {event.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-1.5"
                  >
                    <h4 className="font-semibold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">quiz</span>
                      {faq.q}
                    </h4>
                    <p className="text-xs text-on-surface-variant pl-6 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Organizer info & Guidelines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Organizer Card */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="font-headline font-bold text-base text-on-surface">Organizing Chapter</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold shadow-md">
                ACM
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{event.leadOrganizer}</h4>
                <p className="text-xs text-on-surface-variant">Chartered Student Society</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Official faculty-supervised collegiate organization advancing engineering rigor, peer mentorship, and competitive software sprints.
            </p>
            <div className="pt-2 border-t border-surface-container-high flex justify-between text-xs text-on-surface-variant">
              <span>Chapter Email:</span>
              <a href="mailto:hackcampus@campusconnect.edu" className="text-primary font-semibold hover:underline">
                hackcampus@campusconnect.edu
              </a>
            </div>
          </div>

          {/* Quick Rules & Guidelines */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 text-xs">
            <h3 className="font-headline font-bold text-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">policy</span>
              Participation Code & Rules
            </h3>
            <ul className="space-y-2 text-on-surface-variant list-disc pl-4 leading-relaxed">
              <li>All participants must check in with physical or digital CampusConnect student IDs.</li>
              <li>Pre-written commercial code is prohibited; open-source libraries and APIs are permitted.</li>
              <li>Hardware kits are issued on Day 1 upon signing collateral equipment slips.</li>
              <li>Adhere to the University Student Code of Conduct and Respectful Quad Protocol.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
