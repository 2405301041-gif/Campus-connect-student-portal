import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface pt-16 pb-12 border-t border-outline/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary-container flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <span className="text-xl font-bold font-headline tracking-tight text-white">
                Campus<span className="text-primary-fixed">Connect</span>
              </span>
            </div>
            <p className="text-sm text-surface-variant/80 max-w-sm leading-relaxed">
              The official centralized collegiate student portal uniting student organizations, flagship technical hackathons, academic circulars, and campus life experiences.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Discover</h4>
            <ul className="space-y-2 text-sm text-surface-variant/80">
              <li><Link to="/events" className="hover:text-primary-fixed transition-colors">Campus Events Directory</Link></li>
              <li><Link to="/clubs" className="hover:text-primary-fixed transition-colors">Clubs & Societies</Link></li>
              <li><Link to="/announcements" className="hover:text-primary-fixed transition-colors">Official Circulars</Link></li>
              <li><Link to="/events/hackcampus-2025" className="hover:text-primary-fixed transition-colors">HackCampus 2025</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Student Hub</h4>
            <ul className="space-y-2 text-sm text-surface-variant/80">
              <li><Link to="/dashboard" className="hover:text-primary-fixed transition-colors">Student Dashboard</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-fixed transition-colors">Digital Student ID</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-fixed transition-colors">Study Room Reservations</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-fixed transition-colors">Activity Credits Tracker</Link></li>
            </ul>
          </div>

          {/* University Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Help & Assistance</h4>
            <ul className="space-y-2 text-sm text-surface-variant/80">
              <li><Link to="/contact" className="hover:text-primary-fixed transition-colors">Student Affairs Helpdesk</Link></li>
              <li><Link to="/contact" className="hover:text-primary-fixed transition-colors">Submit Support Ticket</Link></li>
              <li><Link to="/about" className="hover:text-primary-fixed transition-colors">Campus Leadership Council</Link></li>
              <li><a href="tel:911" className="text-rose-400 hover:underline">Campus Emergency Hotline</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-variant/60">
          <p>© 2025 CampusConnect Student Portal. Built with React Vite & Node.js.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Student Honor Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
