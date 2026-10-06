const API_BASE = "/api";

export async function fetchPulse() {
  const res = await fetch(`${API_BASE}/pulse`);
  if (!res.ok) throw new Error("Failed to fetch pulse");
  return res.json();
}

export async function fetchEvents(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all") query.append("category", params.category);
  if (params.format && params.format !== "all") query.append("format", params.format);
  if (params.search) query.append("search", params.search);

  const url = `${API_BASE}/events${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

export async function createEvent(eventData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function registerForEvent(id, data = {}) {
  const res = await fetch(`${API_BASE}/events/${id}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register for event");
  return res.json();
}

export async function toggleBookmarkEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}/bookmark`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to toggle bookmark");
  return res.json();
}

export async function fetchClubs(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all") query.append("category", params.category);
  if (params.search) query.append("search", params.search);

  const url = `${API_BASE}/clubs${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch clubs");
  return res.json();
}

export async function toggleJoinClub(id) {
  const res = await fetch(`${API_BASE}/clubs/${id}/join`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to toggle club join");
  return res.json();
}

export async function createClub(clubData) {
  const res = await fetch(`${API_BASE}/clubs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubData),
  });
  if (!res.ok) throw new Error("Failed to register club");
  return res.json();
}

export async function fetchAnnouncements(params = {}) {
  const query = new URLSearchParams();
  if (params.division && params.division !== "All Divisions") query.append("division", params.division);
  if (params.search) query.append("search", params.search);

  const url = `${API_BASE}/announcements${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
}

export async function fetchStudentDashboard() {
  const res = await fetch(`${API_BASE}/student/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch student dashboard");
  return res.json();
}

export async function verifyCheckIn(code) {
  const res = await fetch(`${API_BASE}/student/check-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) throw new Error("Check-in failed");
  return res.json();
}

export async function reserveRoom(data) {
  const res = await fetch(`${API_BASE}/student/reserve-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to reserve room");
  return res.json();
}

export async function markNotificationRead(id) {
  const res = await fetch(`${API_BASE}/student/notifications/${id}/read`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to update notification");
  return res.json();
}

export async function submitSupportTicket(ticketData) {
  const res = await fetch(`${API_BASE}/support/ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticketData),
  });
  if (!res.ok) throw new Error("Failed to submit support ticket");
  return res.json();
}
