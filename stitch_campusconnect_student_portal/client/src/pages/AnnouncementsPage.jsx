import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function AnnouncementsPage({ announcements = [] }) {
  const [selectedDivision, setSelectedDivision] = useState("All Divisions");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState("ann-01");

  const divisions = [
    "All Divisions",
    "Controller of Exams",
    "Dean of Students",
    "Campus Facilities",
    "Research Cell",
  ];

  const filteredAnnouncements = useMemo(() => {
    let result = [...announcements];

    if (selectedDivision !== "All Divisions") {
      result = result.filter(
        (a) => a.division.toLowerCase() === selectedDivision.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.refCode.toLowerCase().includes(q)
      );
    }

    return result;
  }, [announcements, selectedDivision, searchTerm]);

  const handleDownload = (e, notice) => {
    e.stopPropagation();
    alert(`Downloading official document: ${notice.attachmentName} (${notice.attachmentSize})`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24">
      {/* Header section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Official University Circulars & Directives
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
            University Announcements & Notices
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
            Verified academic circulars, examination rotas, campus infrastructure maintenance schedules, and scholarship funding notices.
          </p>
        </div>

        {/* Quick Stats Badge Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">campaign</span>
            <div>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Active Notices</span>
              <span className="font-headline font-bold text-sm text-on-surface">{announcements.length} Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
            <span className="material-symbols-outlined text-error text-[22px]">notification_important</span>
            <div>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Mandatory Alerts</span>
              <span className="font-headline font-bold text-sm text-error">2 Urgent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 border border-outline-variant/30 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search circulars, department codes, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((notice) => {
          const isExpanded = expandedId === notice.id;
          const isUrgent = notice.urgency === "urgent";

          return (
            <div
              key={notice.id}
              onClick={() => setExpandedId(isExpanded ? null : notice.id)}
              className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                isUrgent
                  ? "bg-surface-container-lowest border-error/30 shadow-sm"
                  : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Card Header Strip */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isUrgent
                        ? "bg-error-container text-on-error-container"
                        : "bg-primary-fixed text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {isUrgent ? "warning" : "campaign"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-primary">{notice.refCode}</span>
                      <span className="text-xs text-on-surface-variant">• {notice.division}</span>
                      {isUrgent && (
                        <span className="px-2 py-0.5 rounded-full bg-error text-white font-bold text-[10px] uppercase tracking-wider">
                          Urgent Directive
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline font-bold text-base text-on-surface">{notice.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{notice.summary}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-14 sm:pl-0">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-on-surface block">{notice.date}</span>
                    <span className="text-[11px] text-on-surface-variant block">{notice.publishedAgo}</span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[20px] text-on-surface-variant transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-surface-container-high bg-surface-container-low/40 space-y-4 animate-in fade-in duration-150">
                  <div className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-line pl-14">
                    {notice.content}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-container-high pl-14">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-outline text-[18px]">verified_user</span>
                      <span>Ratified by Secretariat of University Operations</span>
                    </div>

                    <button
                      onClick={(e) => handleDownload(e, notice)}
                      className="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-primary font-bold text-xs border border-primary/20 shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Download Attachment ({notice.attachmentSize})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
