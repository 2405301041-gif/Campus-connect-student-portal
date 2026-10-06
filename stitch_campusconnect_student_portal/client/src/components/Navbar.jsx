import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { markNotificationRead } from "../services/api";

export default function Navbar({ onOpenHostModal, onOpenSearch, studentData, onRefreshStudent }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = studentData?.notifications || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Clubs & Societies", path: "/clubs" },
    { label: "Announcements", path: "/announcements" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      try {
        await markNotificationRead(notif.id);
        if (onRefreshStudent) onRefreshStudent();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-tertiary to-secondary-container flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl tracking-tight text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">
                Campus<span className="text-primary">Connect</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase -mt-1">
                Student Portal
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search, Notifications, Host Event, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="hidden md:flex items-center justify-between w-56 h-10 px-3 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all border border-outline-variant/30 text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Search events, clubs...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono text-[11px] font-bold">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-error text-white font-bold text-[10px] leading-none animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
                    <h4 className="font-bold text-sm text-on-surface">Campus Notifications</h4>
                  </div>
                  <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary-fixed">
                    {unreadCount} Unread
                  </span>
                </div>

                <div className="mt-2 divide-y divide-surface-container-high max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="py-6 text-center text-xs text-on-surface-variant">No notifications.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3 rounded-xl cursor-pointer transition-colors ${
                          n.read
                            ? "opacity-70 hover:bg-surface-container-low"
                            : "bg-surface-container-low/70 hover:bg-surface-container-high"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-on-surface">{n.title}</span>
                          <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Host Event CTA Button */}
          <button
            onClick={onOpenHostModal}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-semibold text-xs shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Host Event</span>
          </button>

          {/* Maya Lin Profile Pill */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 pl-1 py-1 pr-3 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors border border-outline-variant/30"
          >
            <div className="relative flex-shrink-0">
              <img
                alt="Maya Lin"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvuhxhYgH1Cs8y_-_7AIqllQc-K0t-4KZww_BOtF_C3MHUprW-hxRzgQoC3tw6O03rWFe_VoPXw4hu7SBoQ7xtYIAB6AMNdqQwVX-Mqzgvlfm_QyVW3ywCy52h75lFvw58jMCv6sDaHBqcnaFxX01uGGU-0TLFNqsSXtaTGXjulZVFHkoR0m2tBwVOmDyUWf51HU-c-l6tM03iXx4PEVop_PMyX-oVPnh9QS4t9Wmx_EwBSxAELuVyGA"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-on-surface">Maya Lin</span>
              <span className="text-[10px] text-on-surface-variant font-medium">CS '26 • Honors</span>
            </div>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container-high px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="flex items-center gap-2 w-full h-10 px-3 rounded-xl bg-surface-container-low text-on-surface-variant text-xs mb-3"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>Search events, clubs, notices... (⌘K)</span>
          </button>

          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-surface-container-high flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHostModal();
              }}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Host New Event</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
