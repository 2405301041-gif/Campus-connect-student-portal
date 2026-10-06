import React, { useState } from "react";
import { submitSupportTicket } from "../services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "Maya Lin",
    email: "maya.lin@campusconnect.edu",
    department: "Student Affairs Helpdesk",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;

    try {
      setLoading(true);
      const res = await submitSupportTicket(formData);
      setSubmittedTicket(res.ticket);
      setFormData({
        ...formData,
        subject: "",
        message: ""
      });
    } catch (err) {
      alert(err.message || "Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  };

  const helpdesks = [
    {
      title: "Student Affairs Helpdesk",
      tag: "Academic & Campus Life",
      room: "Student Center, Room 104",
      hours: "Mon-Fri 8:30 AM – 5:00 PM",
      email: "studentaffairs@campusconnect.edu",
      icon: "account_balance"
    },
    {
      title: "IT & Portal Technical Desk",
      tag: "ID, Wi-Fi & Credentials",
      room: "Turing Computing Commons B12",
      hours: "24/7 Student Hotline Active",
      email: "helpdesk@campusconnect.edu",
      icon: "computer"
    },
    {
      title: "Controller of Exams Inquiries",
      tag: "Schedules, Transcripts & Rota",
      room: "Admin Building, Room 201",
      hours: "Mon-Fri 9:00 AM – 4:00 PM",
      email: "exams@campusconnect.edu",
      icon: "assignment"
    }
  ];

  const faqs = [
    {
      q: "How do I show proof of event registration at check-in?",
      a: "Open your Student Dashboard to display your Pass Reference Code, or tap 'Quick Check-In' to scan the QR terminal directly at the auditorium gate."
    },
    {
      q: "Can I cancel a study pod or media lab reservation?",
      a: "Yes. Study pod bookings can be modified up to 30 minutes before your reserved start time from your Student Dashboard."
    },
    {
      q: "What should I do if my digital student ID card details are outdated?",
      a: "Submit a support inquiry below addressed to Student Affairs. Transcript and cohort updates reflect within 24 business hours."
    },
    {
      q: "How do student organizations apply for university activity grant funds?",
      a: "Chartered societies can apply via the Research Cell & Student Council Innovation grant calls announced under the Official Circulars board."
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 space-y-12">
      {/* Top Banner & Live Status */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-surface-container-high">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            24/7 Student Assistance Network
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
            Get in Touch & Student Support Center
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
            Have questions about event registrations, room reservations, or society charters? We are here to help you navigate campus life seamlessly.
          </p>
        </div>

        {/* Live operational badge */}
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-on-surface">Systems Operational</span>
          </div>
          <span className="text-outline text-xs">|</span>
          <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
            <span>Avg Response: <strong className="text-on-surface">8 mins</strong></span>
          </div>
        </div>
      </section>

      {/* 3 Department Helpdesk Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpdesks.map((d) => (
          <div
            key={d.title}
            className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">{d.icon}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{d.tag}</span>
              <h3 className="font-headline font-bold text-base text-on-surface mt-0.5">{d.title}</h3>
            </div>
            <div className="space-y-1.5 text-xs text-on-surface-variant">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                <span>{d.room}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                <span>{d.hours}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline">mail</span>
                <a href={`mailto:${d.email}`} className="text-primary hover:underline font-semibold">{d.email}</a>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Support Inquiry Form & FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Support Ticket Form */}
        <section className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Direct Assistance</span>
            <h2 className="font-headline font-extrabold text-2xl text-on-surface mt-0.5">Submit Support Inquiry</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Your inquiry will be directly routed to the verified department desk officer.
            </p>
          </div>

          {submittedTicket && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Inquiry #{submittedTicket.id} Logged Successfully!</span>
              </div>
              <p>Department: <strong>{submittedTicket.department}</strong></p>
              <p>Estimated turnaround: <strong>{submittedTicket.etaResponse}</strong> via student email.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">
                  University Student Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">
                Target Department Desk
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Student Affairs Helpdesk">Student Affairs Helpdesk</option>
                <option value="IT & Technical Credentials Desk">IT & Technical Credentials Desk</option>
                <option value="Controller of Examinations Secretariat">Controller of Examinations Secretariat</option>
                <option value="Campus Facilities & Room Scheduling">Campus Facilities & Room Scheduling</option>
                <option value="Student Council & Club Charter Wing">Student Council & Club Charter Wing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of your inquiry or issue..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">
                Detailed Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Include student ID, course/event reference codes, and specifics..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              {loading ? "Submitting Inquiry..." : "Dispatch Support Ticket"}
            </button>
          </form>
        </section>

        {/* FAQs Accordion */}
        <section className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Knowledge Base</span>
            <h2 className="font-headline font-extrabold text-2xl text-on-surface mt-0.5">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2"
              >
                <h4 className="font-headline font-bold text-sm text-on-surface flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">quiz</span>
                  <span>{f.q}</span>
                </h4>
                <p className="text-xs text-on-surface-variant pl-6 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
