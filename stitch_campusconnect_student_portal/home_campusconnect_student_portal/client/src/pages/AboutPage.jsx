import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const councilMembers = [
    {
      name: "Maya Lin",
      role: "President, Student Portal Initiative",
      program: "CS '26 • Honors College",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvuhxhYgH1Cs8y_-_7AIqllQc-K0t-4KZww_BOtF_C3MHUprW-hxRzgQoC3tw6O03rWFe_VoPXw4hu7SBoQ7xtYIAB6AMNdqQwVX-Mqzgvlfm_QyVW3ywCy52h75lFvw58jMCv6sDaHBqcnaFxX01uGGU-0TLFNqsSXtaTGXjulZVFHkoR0m2tBwVOmDyUWf51HU-c-l6tM03iXx4PEVop_PMyX-oVPnh9QS4t9Wmx_EwBSxAELuVyGA",
      quote: "CampusConnect was born out of a desire to eliminate fragmented WhatsApp groups and poster boards, unifying collegiate life under one intuitive digital campus."
    },
    {
      name: "Dev Kothari",
      role: "Vice President, Technology Operations",
      program: "Software Eng '25",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      quote: "Architected for high-density traffic during fest ticket releases and examination schedule ratifications with zero downtime."
    },
    {
      name: "Anya Rostova",
      role: "Director of Cultural & Society Affairs",
      program: "Fine Arts & Media '26",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      quote: "Empowering 60+ student organizations to host verified events, manage registrations, and transparently access student activity funds."
    },
    {
      name: "Marcus Vance",
      role: "Head of Student Welfare & Space Logistics",
      program: "Mechanical Eng '25",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      quote: "Automating room reservations for study pods and lab spaces so every student has an inspiring environment to innovate."
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 space-y-16">
      {/* Immersive Storytelling Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container via-surface-container-low to-background p-8 md:p-14 border border-outline-variant/30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-primary/15 via-tertiary/20 to-secondary-container/20 blur-3xl pointer-events-none rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-primary text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Official University Student Portal Initiative</span>
            </div>

            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
              Bridging Campus Life,{" "}
              <span className="bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent">
                Student Passion
              </span>
              , and Academic Excellence.
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
              CampusConnect transforms the collegiate journey from isolated lecture halls into a lively, interconnected ecosystem. Designed, built, and championed by students, for students.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md shadow-primary/25 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Explore Campus Events
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xs border border-outline-variant/30 hover:bg-surface-container-high transition-colors"
              >
                Contact Assistance
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40 bg-surface-container-lowest p-2">
              <div
                className="h-72 w-full rounded-xl bg-cover bg-center flex flex-col justify-end p-5 relative overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <span className="px-2.5 py-1 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                    Central Quad & Commons
                  </span>
                  <h4 className="font-headline font-bold text-base text-white mt-1">
                    Innovation Quad & Amphitheater
                  </h4>
                  <p className="text-xs text-surface-variant/80 mt-0.5">
                    Hub for 40+ annual student assemblies, cultural showcases, and hackathons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission & Platform Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Foundation</span>
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface">Built on Three Principles</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Engineered to streamline collegiate administrative workflows while elevating student discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h3 className="font-headline font-bold text-base text-on-surface">Verified University Directives</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Direct integration with Controller of Examinations, Dean of Students, and Facilities ensures students receive authenticated notices without rumors or delays.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">hub</span>
            </div>
            <h3 className="font-headline font-bold text-base text-on-surface">Autonomous Student Societies</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Student chapters have dedicated tooling to charter clubs, publish workshops, track membership lists, and manage pass ticket check-ins effortlessly.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <h3 className="font-headline font-bold text-base text-on-surface">Frictionless Campus Living</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              From instant library study pod booking to holographic digital student IDs and automated activity graduation credits tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Student Leadership Council */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Student Council</span>
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface">
            Meet the Student Portal Council
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Undergraduate and graduate student representatives steering CampusConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {councilMembers.map((member) => (
            <div
              key={member.name}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-5 flex flex-col items-center text-center space-y-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-headline font-bold text-sm text-on-surface">{member.name}</h4>
                  <p className="text-[11px] font-semibold text-primary">{member.role}</p>
                  <p className="text-[10px] text-outline mt-0.5">{member.program}</p>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed pt-2 border-t border-surface-container-high">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
