import React, { useState } from "react";
import { Link } from "react-router-dom";
import { reserveRoom } from "../services/api";

export default function DashboardPage({
  studentData = {},
  onOpenIdModal,
  onOpenCheckInModal,
  onSelectEventToRegister,
  onRefreshStudent
}) {
  const [selectedRoom, setSelectedRoom] = useState("Study Pod 4B");
  const [selectedBuilding, setSelectedBuilding] = useState("Main Library 2nd Floor");
  const [reserveTime, setReserveTime] = useState("03:00 PM - 05:00 PM");
  const [reserveDate, setReserveDate] = useState("Today");
  const [reserveLoading, setReserveLoading] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState("");

  const registeredEvents = studentData.registeredEvents || [];
  const joinedClubs = studentData.joinedClubs || [];
  const reservations = studentData.roomReservations || [];
  const schedule = studentData.scheduleToday || [];

  const handleBookRoom = async (e) => {
    e.preventDefault();
    try {
      setReserveLoading(true);
      setReservationSuccess("");
      const res = await reserveRoom({
        room: selectedRoom,
        building: selectedBuilding,
        time: reserveTime,
        date: reserveDate
      });
      setReservationSuccess(res.message);
      if (onRefreshStudent) onRefreshStudent();
    } catch (err) {
      alert(err.message || "Failed to reserve room");
    } finally {
      setReserveLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10 pb-24 space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 md:p-8 border border-outline-variant/30 shadow-sm">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 via-tertiary/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={studentData.avatarUrl}
                alt="Maya Lin"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-md ring-4 ring-primary/20"
              />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container ring-2 ring-white">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface">
                  Welcome back, {studentData.name || "Maya"}! 👋
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 text-xs font-bold text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  Spring Semester '25
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-on-surface-variant">
                {studentData.program} • <span className="font-bold text-on-surface">ID: {studentData.id}</span> • {studentData.honors}
              </p>

              <div className="mt-3 flex items-center gap-3 text-xs text-on-surface-variant font-medium flex-wrap">
                <span className="inline-flex items-center gap-1 text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">event_upcoming</span>
                  {registeredEvents.length} registered activities
                </span>
                <span className="text-outline-variant">•</span>
                <span className="inline-flex items-center gap-1 text-secondary font-bold">
                  <span className="material-symbols-outlined text-[16px]">award_star</span>
                  {studentData.creditsEarned} / {studentData.creditsRequired} Activity Credits
                </span>
              </div>
            </div>
          </div>

          {/* Quick Credential Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenIdModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-surface-container-low text-on-surface font-bold text-xs hover:bg-surface-container-high transition-colors border border-outline-variant/40"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>Digital Student ID</span>
            </button>

            <button
              onClick={onOpenCheckInModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md shadow-primary/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>Quick Check-In</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Metric Bento Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant">Registered Passes</span>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline font-extrabold text-3xl text-on-surface">{registeredEvents.length}</span>
            <span className="text-xs font-bold text-primary">Active Passes</span>
          </div>
          <div className="mt-3 pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>Next: HackCampus 2025</span>
            <Link to="/events" className="text-primary hover:underline font-semibold">Browse</Link>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant">Joined Clubs</span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline font-extrabold text-3xl text-on-surface">{joinedClubs.length}</span>
            <span className="text-xs font-bold text-tertiary">Societies</span>
          </div>
          <div className="mt-3 pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>ACM Executive Council</span>
            <Link to="/clubs" className="text-tertiary hover:underline font-semibold">Directory</Link>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant">Activity Credits</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">award_star</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline font-extrabold text-3xl text-on-surface">{studentData.creditsEarned}</span>
            <span className="text-xs text-on-surface-variant">/ {studentData.creditsRequired} Req.</span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                style={{ width: `${(studentData.creditsEarned / studentData.creditsRequired) * 100}%` }}
              ></div>
            </div>
            <span className="text-right text-[10px] text-on-surface-variant font-medium">93% to graduation clearance</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant">Room Reservations</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">meeting_room</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline font-extrabold text-3xl text-on-surface">{reservations.length}</span>
            <span className="text-xs font-bold text-amber-700">Confirmed</span>
          </div>
          <div className="mt-3 pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>Library Study Pod 4B</span>
            <span className="text-emerald-600 font-bold text-[10px]">Access Active</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Schedule & Registered Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Today's Schedule Timeline & Registered Events */}
        <div className="lg:col-span-8 space-y-8">
          {/* Today's Schedule */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">calendar_today</span>
                <h3 className="font-headline font-bold text-base text-on-surface">Today's Academic & Event Schedule</h3>
              </div>
              <span className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary-fixed">
                Thursday, Spring '25
              </span>
            </div>

            <div className="divide-y divide-surface-container-high">
              {schedule.map((slot, idx) => (
                <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] mt-0.5 ${
                        slot.status === "completed"
                          ? "text-emerald-500"
                          : slot.status === "in-progress"
                          ? "text-primary animate-pulse"
                          : "text-outline"
                      }`}
                    >
                      {slot.status === "completed" ? "check_circle" : "radio_button_checked"}
                    </span>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-on-surface">{slot.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                        {slot.venue}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-on-surface block">{slot.time}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        slot.status === "completed"
                          ? "text-emerald-600"
                          : slot.status === "in-progress"
                          ? "text-primary"
                          : "text-outline"
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Events Passes List */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">confirmation_number</span>
                <h3 className="font-headline font-bold text-base text-on-surface">Your Registered Event Passes</h3>
              </div>
              <Link to="/events" className="text-xs font-bold text-primary hover:underline">
                Explore More Events
              </Link>
            </div>

            {registeredEvents.length === 0 ? (
              <p className="py-6 text-center text-xs text-on-surface-variant">No event passes registered yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {registeredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {ev.categoryLabel}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                          Pass Confirmed
                        </span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mt-1">{ev.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">{ev.date}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5 truncate">{ev.venue}</p>
                    </div>

                    <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                      <button
                        onClick={() => onSelectEventToRegister(ev)}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">qr_code</span>
                        <span>View Ticket Pass</span>
                      </button>
                      <Link to={`/events/${ev.id}`} className="text-xs text-on-surface-variant hover:text-on-surface">
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Room Reservation Panel & Joined Clubs */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Study Room Reservation Form */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-700 text-[22px]">meeting_room</span>
              <div>
                <h3 className="font-headline font-bold text-base text-on-surface">Reserve Campus Space</h3>
                <p className="text-[11px] text-on-surface-variant">Instant student reservation booking</p>
              </div>
            </div>

            {reservationSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-semibold">
                {reservationSuccess}
              </div>
            )}

            <form onSubmit={handleBookRoom} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1">
                  Room Type
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Study Pod 4B">Study Pod 4B (1-2 Persons)</option>
                  <option value="Project Collaboration Room 2">Project Collaboration Room 2 (4-6 Persons)</option>
                  <option value="Media Editing Suite A">Media Editing Suite A (Soundproof)</option>
                  <option value="Hardware Prototyping Bay 1">Hardware Prototyping Bay 1</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1">
                  Building Location
                </label>
                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Main Library 2nd Floor">Main Library 2nd Floor</option>
                  <option value="Turing Hall Engineering Quad">Turing Hall Engineering Quad</option>
                  <option value="Student Union Center Level 3">Student Union Center Level 3</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1">
                    Date
                  </label>
                  <select
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="April 05">April 05, 2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1">
                    Time Slot
                  </label>
                  <select
                    value={reserveTime}
                    onChange={(e) => setReserveTime(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={reserveLoading}
                className="w-full mt-2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {reserveLoading ? "Confirming Space..." : "Book Room Reservation"}
              </button>
            </form>

            {/* Active Reservations */}
            <div className="pt-3 border-t border-surface-container-high space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline block">
                Active Space Passes ({reservations.length})
              </span>
              {reservations.map((r) => (
                <div key={r.id} className="p-2.5 rounded-xl bg-surface-container-low text-xs space-y-1">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>{r.room}</span>
                    <span className="font-mono text-primary text-[10px]">{r.code}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">{r.building} • {r.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Joined Clubs Quick List */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-base text-on-surface">Your Joined Clubs</h3>
              <Link to="/clubs" className="text-xs font-bold text-primary hover:underline">
                Explore
              </Link>
            </div>

            <div className="space-y-2">
              {joinedClubs.map((club) => (
                <div
                  key={club.id}
                  className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${club.logoBg} text-white flex items-center justify-center text-xs shadow-sm`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{club.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-on-surface">{club.name}</h4>
                      <p className="text-[10px] text-on-surface-variant">{club.categoryLabel}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
