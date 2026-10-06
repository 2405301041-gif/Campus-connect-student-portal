import express from "express";
import cors from "cors";
import {
  initialEvents,
  initialClubs,
  initialAnnouncements,
  studentProfile
} from "./data/mockData.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory mutable state
let events = [...initialEvents];
let clubs = [...initialClubs];
let announcements = [...initialAnnouncements];
let student = { ...studentProfile };
let supportTickets = [];

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "CampusConnect Node.js Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Campus Pulse Stats
app.get("/api/pulse", (req, res) => {
  const totalPrize = events.reduce((acc, curr) => {
    const num = parseInt(curr.prizePool.replace(/[^0-9]/g, ""), 10) || 0;
    return acc + num;
  }, 0);

  res.json({
    activeStudents: 12480,
    activeSocieties: clubs.length,
    liveEventsCount: events.length,
    totalPrizePoolFormatted: `$${(totalPrize || 45000).toLocaleString()}+`,
    annualEvents: 184,
    springSemesterActive: true
  });
});

// Events API
app.get("/api/events", (req, res) => {
  const { category, search, format } = req.query;
  let results = [...events];

  if (category && category !== "all") {
    results = results.filter(
      e => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (format && format !== "all") {
    results = results.filter(
      e => e.format.toLowerCase() === format.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.leadOrganizer.toLowerCase().includes(q)
    );
  }

  // Augment with isRegistered and isBookmarked for Maya
  const augmented = results.map(ev => ({
    ...ev,
    isRegistered: student.registeredEventIds.includes(ev.id),
    isBookmarked: student.bookmarkedEventIds.includes(ev.id)
  }));

  res.json(augmented);
});

app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json({
    ...event,
    isRegistered: student.registeredEventIds.includes(event.id),
    isBookmarked: student.bookmarkedEventIds.includes(event.id)
  });
});

app.post("/api/events", (req, res) => {
  const { title, subtitle, category, date, time, venue, prizePool, format, description, leadOrganizer } = req.body;
  
  if (!title || !date || !venue) {
    return res.status(400).json({ error: "Title, date, and venue are required." });
  }

  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  const newEvent = {
    id,
    title,
    subtitle: subtitle || "Collegiate Student Activity",
    badge: "Student Organized",
    category: category || "tech",
    categoryLabel: category === "cultural" ? "Cultural & Arts" : category === "sports" ? "Sports & Athletics" : category === "academic" ? "Academic & Research" : "Tech & Hackathons",
    date,
    time: time || "10:00 AM EST",
    venue,
    prizePool: prizePool || "$500",
    format: format || "In-Person",
    spotsTotal: 150,
    spotsRemaining: 150,
    registeredCount: 0,
    leadOrganizer: leadOrganizer || student.name,
    description: description || "Join this exciting student activity hosted on campus!",
    bannerImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    tracks: [],
    timeline: [],
    faqs: []
  };

  events.unshift(newEvent);

  student.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: "New Event Published",
    message: `Your event "${newEvent.title}" has been successfully published to the directory.`,
    time: "Just now",
    read: false
  });

  res.status(201).json(newEvent);
});

app.post("/api/events/:id/register", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  const { teamName, track, attendeeName = student.name } = req.body;

  const isAlreadyRegistered = student.registeredEventIds.includes(event.id);
  if (!isAlreadyRegistered) {
    student.registeredEventIds.push(event.id);
    event.registeredCount += 1;
    if (event.spotsRemaining > 0) event.spotsRemaining -= 1;
  }

  const ticketCode = `CC-PASS-${event.id.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;

  student.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `Registration Confirmed: ${event.title}`,
    message: `Pass issued! Reference ticket #${ticketCode}. We look forward to seeing you at ${event.venue}.`,
    time: "Just now",
    read: false
  });

  res.json({
    success: true,
    message: `Successfully registered for ${event.title}!`,
    ticket: {
      ticketCode,
      attendeeName,
      eventName: event.title,
      date: event.date,
      venue: event.venue,
      teamName: teamName || "Solo Participant",
      track: track || "General Entry"
    }
  });
});

app.post("/api/events/:id/bookmark", (req, res) => {
  const { id } = req.params;
  const index = student.bookmarkedEventIds.indexOf(id);
  let bookmarked = false;

  if (index > -1) {
    student.bookmarkedEventIds.splice(index, 1);
    bookmarked = false;
  } else {
    student.bookmarkedEventIds.push(id);
    bookmarked = true;
  }

  res.json({ success: true, bookmarked, bookmarkedCount: student.bookmarkedEventIds.length });
});

// Clubs API
app.get("/api/clubs", (req, res) => {
  const { category, search } = req.query;
  let results = [...clubs];

  if (category && category !== "all") {
    results = results.filter(
      c => c.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.shortDesc.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.leadOrganizer.toLowerCase().includes(q)
    );
  }

  const augmented = results.map(cl => ({
    ...cl,
    isJoined: student.joinedClubIds.includes(cl.id)
  }));

  res.json(augmented);
});

app.post("/api/clubs/:id/join", (req, res) => {
  const club = clubs.find(c => c.id === req.params.id);
  if (!club) {
    return res.status(404).json({ error: "Club not found" });
  }

  const index = student.joinedClubIds.indexOf(club.id);
  let joined = false;

  if (index > -1) {
    student.joinedClubIds.splice(index, 1);
    club.membersCount = Math.max(0, club.membersCount - 1);
    joined = false;
  } else {
    student.joinedClubIds.push(club.id);
    club.membersCount += 1;
    joined = true;
  }

  res.json({
    success: true,
    joined,
    clubName: club.name,
    totalJoinedClubs: student.joinedClubIds.length
  });
});

app.post("/api/clubs", (req, res) => {
  const { name, category, leadOrganizer, room, shortDesc, tags } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: "Club name and category are required." });
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newClub = {
    id,
    name,
    category,
    categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
    leadOrganizer: leadOrganizer || student.name,
    membersCount: 1,
    eventsCount: 0,
    founded: "2025",
    meetingTime: "TBD",
    room: room || "Student Center Suite 2",
    shortDesc: shortDesc || "Newly chartered student society on CampusConnect.",
    tags: tags || ["Student Organization"],
    isJoined: true,
    logoBg: "from-purple-600 to-indigo-600",
    icon: "groups"
  };

  clubs.unshift(newClub);
  student.joinedClubIds.push(newClub.id);

  res.status(201).json(newClub);
});

// Announcements API
app.get("/api/announcements", (req, res) => {
  const { division, search } = req.query;
  let results = [...announcements];

  if (division && division !== "All Divisions") {
    results = results.filter(
      a => a.division.toLowerCase() === division.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.refCode.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Student Dashboard API
app.get("/api/student/dashboard", (req, res) => {
  const registeredEvents = events.filter(e =>
    student.registeredEventIds.includes(e.id)
  );

  const joinedClubs = clubs.filter(c =>
    student.joinedClubIds.includes(c.id)
  );

  res.json({
    ...student,
    registeredEvents,
    joinedClubs,
    totalRegisteredEvents: registeredEvents.length,
    totalJoinedClubs: joinedClubs.length,
    unreadNotificationsCount: student.notifications.filter(n => !n.read).length
  });
});

app.post("/api/student/check-in", (req, res) => {
  const { code } = req.body;
  res.json({
    success: true,
    message: "Verified student digital check-in.",
    timestamp: new Date().toLocaleTimeString(),
    location: "Main Innovation Quad Gate",
    student: {
      name: student.name,
      id: student.id,
      cohort: student.cohort
    }
  });
});

app.post("/api/student/reserve-room", (req, res) => {
  const { room, building, date, time } = req.body;
  if (!room || !building) {
    return res.status(400).json({ error: "Room and building required." });
  }

  const reservation = {
    id: `res-${Date.now()}`,
    room,
    building,
    date: `${date || "Today"}, ${time || "03:00 PM - 05:00 PM"}`,
    status: "Confirmed",
    code: `RES-${Math.floor(1000 + Math.random() * 9000)}`
  };

  student.roomReservations.unshift(reservation);

  res.status(201).json({
    success: true,
    message: `Room reserved: ${room} (${building})`,
    reservation
  });
});

app.post("/api/student/notifications/:id/read", (req, res) => {
  const notif = student.notifications.find(n => n.id === req.params.id);
  if (notif) {
    notif.read = true;
  }
  res.json({ success: true, notifications: student.notifications });
});

// Support Inquiries
app.post("/api/support/ticket", (req, res) => {
  const { name, email, department, subject, message } = req.body;
  if (!name || !subject || !message) {
    return res.status(400).json({ error: "Name, subject, and message are required." });
  }

  const ticket = {
    id: `TCK-${Math.floor(100000 + Math.random() * 900000)}`,
    name,
    email: email || student.email,
    department: department || "Student Affairs Helpdesk",
    subject,
    message,
    status: "Submitted",
    timestamp: new Date().toISOString(),
    etaResponse: "Within 8 minutes"
  };

  supportTickets.unshift(ticket);

  res.status(201).json({
    success: true,
    message: `Support inquiry ${ticket.id} submitted successfully! Support staff has been notified.`,
    ticket
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CampusConnect Node.js Server running on http://localhost:${PORT}`);
});
