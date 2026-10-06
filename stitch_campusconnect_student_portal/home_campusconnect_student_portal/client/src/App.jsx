import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HostEventModal from "./components/HostEventModal";
import RegisterModal from "./components/RegisterModal";
import CommandPaletteModal from "./components/CommandPaletteModal";
import DigitalIdModal from "./components/DigitalIdModal";
import CheckInModal from "./components/CheckInModal";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ClubsPage from "./pages/ClubsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import {
  fetchEvents,
  fetchClubs,
  fetchAnnouncements,
  fetchStudentDashboard,
  fetchPulse,
  toggleBookmarkEvent,
  toggleJoinClub
} from "./services/api";

export default function App() {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [pulse, setPulse] = useState({});
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedEventToRegister, setSelectedEventToRegister] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [eventsRes, clubsRes, annRes, studentRes, pulseRes] = await Promise.all([
        fetchEvents(),
        fetchClubs(),
        fetchAnnouncements(),
        fetchStudentDashboard(),
        fetchPulse()
      ]);
      setEvents(eventsRes);
      setClubs(clubsRes);
      setAnnouncements(annRes);
      setStudentData(studentRes);
      setPulse(pulseRes);
    } catch (err) {
      console.error("Error loading portal data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Global actions
  const handleToggleBookmark = async (eventId) => {
    try {
      await toggleBookmarkEvent(eventId);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleJoinClub = async (clubId) => {
    try {
      await toggleJoinClub(clubId);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventRegistered = () => {
    loadData();
  };

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    loadData();
  };

  const handleClubCreated = (newClub) => {
    setClubs((prev) => [newClub, ...prev]);
    loadData();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
        {/* Sticky Header Navbar */}
        <Navbar
          onOpenHostModal={() => setIsHostModalOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          studentData={studentData}
          onRefreshStudent={loadData}
        />

        {/* Main Content Area */}
        <main className="flex-1 pt-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-on-surface-variant">Connecting to Campus Network...</p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    events={events}
                    clubs={clubs}
                    announcements={announcements}
                    pulse={pulse}
                    onSelectEventToRegister={(ev) => setSelectedEventToRegister(ev)}
                    onToggleJoinClub={handleToggleJoinClub}
                    onOpenHostModal={() => setIsHostModalOpen(true)}
                  />
                }
              />
              <Route
                path="/events"
                element={
                  <EventsPage
                    events={events}
                    onSelectEventToRegister={(ev) => setSelectedEventToRegister(ev)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                }
              />
              <Route
                path="/events/:id"
                element={
                  <EventDetailsPage
                    onSelectEventToRegister={(ev) => setSelectedEventToRegister(ev)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                }
              />
              <Route
                path="/clubs"
                element={
                  <ClubsPage
                    clubs={clubs}
                    onToggleJoinClub={handleToggleJoinClub}
                    onClubCreated={handleClubCreated}
                  />
                }
              />
              <Route
                path="/announcements"
                element={<AnnouncementsPage announcements={announcements} />}
              />
              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    studentData={studentData}
                    onOpenIdModal={() => setIsIdModalOpen(true)}
                    onOpenCheckInModal={() => setIsCheckInModalOpen(true)}
                    onSelectEventToRegister={(ev) => setSelectedEventToRegister(ev)}
                    onRefreshStudent={loadData}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          )}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating Modals */}
        <HostEventModal
          isOpen={isHostModalOpen}
          onClose={() => setIsHostModalOpen(false)}
          onEventCreated={handleEventCreated}
        />

        <RegisterModal
          event={selectedEventToRegister}
          isOpen={!!selectedEventToRegister}
          onClose={() => setSelectedEventToRegister(null)}
          onRegistered={handleEventRegistered}
        />

        <CommandPaletteModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          events={events}
          clubs={clubs}
          onOpenId={() => setIsIdModalOpen(true)}
          onOpenCheckIn={() => setIsCheckInModalOpen(true)}
          onOpenHost={() => setIsHostModalOpen(true)}
        />

        <DigitalIdModal
          isOpen={isIdModalOpen}
          onClose={() => setIsIdModalOpen(false)}
          student={studentData}
        />

        <CheckInModal
          isOpen={isCheckInModalOpen}
          onClose={() => setIsCheckInModalOpen(false)}
        />
      </div>
    </Router>
  );
}
