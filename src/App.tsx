import { useState, useEffect, useRef } from "react";
import resumePdf from "./imports/Suresh_Resume_1-1.pdf";

const SKILLS_LIST = [
  "UI Design",
  "UX Design",
  "User Research",
  "Figma",
  "Wireframing",
  "Prototyping",
  "Design Systems",
  "Mobile App Design",
  "Web Design",
  "Responsive Design",
  "User Flow",
  "Typography",
  "Visual Hierarchy",
  "Color Theory",
  "Style Guide",
  "Moodboard",
  "Photoshop",
  "Premiere Pro",
  "Lottiefiles",
  "Motion Graphics",
  "Social Media Design",
  "Email Templates",
  "Brochure Design",
];

const EXPERIENCE = [
  {
    id: "01",
    company: "PayRup (BPS Plus Private Limited)",
    location: "Bengaluru, India",
    role: "UI/UX Designer",
    period: "Dec 2025 – Present",
    tags: ["Fintech", "Payments", "Mobile", "Web"],
    description:
      "Designed intuitive interfaces for fintech and digital payment products including AEPS, DMT, Wallet, Virtual Account, and Recharge modules.",
    highlights: [
      "Created complete wireframes, high-fidelity UI, and interactive prototypes in Figma",
      "Designed Loan Module, Per Day Loan, Merchant Onboarding, Distributor App, and eShop flows",
      "Built reusable UI components maintaining consistency across product screens",
      "Delivered developer-ready design specs and assets for smooth handoff",
      "Created motion graphics and promotional videos for product launches and marketing campaigns",
    ],
  },
  {
    id: "02",
    company: "Trionova Technologies Pvt. Ltd.",
    location: "Chennai, India",
    role: "UI/UX Designer",
    period: "Oct 2024 – Nov 2025",
    tags: ["Transportation", "SaaS", "AI", "Marketing"],
    description:
      "Contributed to multiple end-to-end design projects across web and mobile platforms, focusing on intuitive, visually engaging, and user-centered digital experiences.",
    highlights: [
      "BET Mobility Transportation & Corporate Employee Cab Booking App",
      "Dots — Service Provider Platform design",
      "Purchase Order Web Dashboard & Medical Scribe AI",
      "Marketing assets: LinkedIn, Instagram, Blog Banners, Festival Posters",
      "Marketing videos for Instagram and YouTube",
    ],
  },
  {
    id: "03",
    company: "Essentiate",
    location: "Chennai, India",
    role: "UI/UX Designer",
    period: "Jun 2024 – Jul 2024",
    tags: ["SaaS", "File Conversion", "Marketing"],
    description:
      "Worked on Convertinator — a smart all-in-one platform for effortless file conversions across videos, audio, documents, and images.",
    highlights: [
      "Designed LinkedIn creatives and infographic content for marketing campaigns",
      "Crafted key visual communication materials for product messaging",
    ],
  },
  {
    id: "04",
    company: "Webbywolf",
    location: "Chennai, India",
    role: "UI/UX Designer (Internship)",
    period: "Oct 2023 – Mar 2024",
    tags: ["Website Redesign", "UI"],
    description:
      "Revamped the company website with modern layout, improved information hierarchy, and enhanced visual consistency for better user engagement.",
    highlights: [
      "Full website redesign with modern visual language",
      "Improved information architecture and navigation structure",
    ],
  },
  {
    id: "05",
    company: "Codeancy",
    location: "Chennai, India",
    role: "UI/UX Designer (Internship)",
    period: "May 2023 – Jul 2023",
    tags: ["Mobile App", "UI", "Multi-project"],
    description:
      "Designed 5 mobile app UIs covering Home Service, FitnestX, Grocery, Real Estate, and Event Booking — both light and dark versions.",
    highlights: [
      "Total of 395 screens across 5 apps in light and dark modes",
      "Maintained consistent design language across diverse app categories",
    ],
  },
];

const PROJECTS = [
  {
    title: "Fintech Payment Suite",
    company: "PayRup",
    tags: ["Fintech", "Mobile", "Web"],
    description:
      "End-to-end UI design for a comprehensive digital payments platform including AEPS, DMT, Wallet, and Recharge modules.",
    stats: "20+ screens",
  },
  {
    title: "Merchant Onboarding",
    company: "PayRup",
    tags: ["Fintech", "Onboarding"],
    description:
      "Complete merchant onboarding, distributor app, and eShop interface with transaction flows and service activation screens.",
    stats: "Full product",
  },
  {
    title: "BET Mobility Apps",
    company: "Trionova",
    tags: ["Transportation", "Mobile"],
    description:
      "Transportation and corporate cab booking application with driver and passenger interfaces.",
    stats: "2 apps",
  },
  {
    title: "Medical Scribe AI",
    company: "Trionova",
    tags: ["AI", "Web", "SaaS"],
    description:
      "Dashboard and interface design for an AI-powered medical scribing platform.",
    stats: "Web dashboard",
  },
  {
    title: "5 Mobile App UIs",
    company: "Codeancy",
    tags: ["Mobile", "Multi-project"],
    description:
      "Home Service, FitnestX, Grocery, Real Estate, and Event Booking apps — each in light and dark modes.",
    stats: "450+ screens",
  },
  {
    title: "Social Media Creatives",
    company: "Multiple",
    tags: ["Marketing", "Motion"],
    description:
      "100+ LinkedIn posters, 80+ Instagram posts, 80+ blog banners, and 25+ Instagram Reels.",
    stats: "285+ assets",
  },
];

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "450+", label: "Screens Designed" },
  { value: "5", label: "Companies" },
  { value: "285+", label: "Marketing Assets" },
];

const TOOLS = ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "Capcut", "Lottiefiles", "Canva"];
const LOVES = ["Design", "Music", "Photography", "Travel", "Gaming", "Movies"];

const DOUBLED_SKILLS = [...SKILLS_LIST, ...SKILLS_LIST];

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    ["about", "experience", "skills", "work", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setCursorHover(!!(t.closest("a,button,[data-hover]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── CUSTOM CURSOR ── */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: cursorHover ? 40 : 10,
          height: cursorHover ? 40 : 10,
          borderRadius: "50%",
          backgroundColor: cursorHover ? "transparent" : "#111",
          border: cursorHover ? "1.5px solid #111" : "none",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── SCROLL PROGRESS ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-[#2563EB] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
              Suresh
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "var(--color-accent)" }}>
              S
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--color-accent)" }}>.</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["about", "experience", "skills", "work", "contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`text-sm tracking-wide capitalize transition-all ${
                  activeSection === link ? "text-[#111] font-medium" : "text-[#888] hover:text-[#111]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link}
              </button>
            ))}
            <a
              href={resumePdf}
              download
              className="text-sm border border-[#111] px-5 py-2 hover:bg-[#111] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Resume ↓
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 space-y-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-[#111] transition-all duration-200 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`block h-0.5 w-6 bg-[#111] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-[#111] transition-all duration-200 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#e5e5e5] bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {["about", "experience", "skills", "work", "contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left capitalize text-lg py-1 hover:text-[#2563EB] transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 px-6 overflow-hidden">

        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-24 right-10 md:right-24 float-shape opacity-10 select-none pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="88" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="8 5" />
            <circle cx="90" cy="90" r="60" stroke="#111" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-4 md:right-40 float-shape-slow opacity-[0.07] select-none pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <rect x="2" y="2" width="96" height="96" stroke="#111" strokeWidth="1.5" />
            <rect x="18" y="18" width="64" height="64" stroke="#2563EB" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-6 md:right-16 spin-slow opacity-[0.06] select-none pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <polygon points="30,2 58,58 2,58" stroke="#111" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Available badge */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex items-center gap-2 border border-[#e5e5e5] rounded-full px-4 py-1.5 w-fit bg-white/80 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-[#555] tracking-wide">Available for work</span>
            </div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#aaa]">UI/UX Designer · Bengaluru</span>
          </div>

          <h1
            className="leading-[1.0] mb-8 max-w-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 60px)",
              letterSpacing: "-0.03em",
            }}
          >
            Turning your ideas into{" "}
            <span style={{ color: "var(--color-accent)" }}>Meaningful</span>
            <br />
            digital experiences.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg md:text-xl text-[#555] max-w-xl leading-relaxed">
              UI/UX Designer specialising in B2B & B2C fintech products — crafting
              intuitive payment flows, merchant platforms, and design systems that
              convert complexity into clarity.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollTo("work")}
                className="text-sm border border-[#111] px-6 py-3 hover:bg-[#111] hover:text-white transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                View Work →
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="text-sm bg-[#111] text-white px-6 py-3 hover:bg-[#2563EB] transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 pt-8 border-t border-[#e5e5e5] grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#888]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex flex-col items-start gap-1">
            <span className="text-xs text-[#bbb] tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 border border-[#ddd] rounded-full flex items-start justify-center pt-1.5">
              <div className="scroll-dot w-1 h-1 rounded-full bg-[#999]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="01" label="About" title="Who I Am" />

          <div className="grid md:grid-cols-2 gap-16 items-start mt-12">
            <div>
              <p className="text-lg text-[#444] leading-relaxed mb-5">
                Creative and detail-oriented UI/UX Designer with nearly{" "}
                <strong>2 years of experience</strong> designing intuitive,
                user-friendly, and visually engaging digital experiences.
              </p>
              <p className="text-[#666] leading-relaxed mb-5">
                Experienced in wireframing, user flows, prototyping, UI design,
                design systems, and responsive web/mobile interfaces. Strong
                understanding of user-centered design principles with hands-on
                experience designing solutions for{" "}
                <strong>
                  fintech, payments, merchant, and financial-service platforms.
                </strong>
              </p>
              <p className="text-[#666] leading-relaxed mb-8">
                I also create marketing creatives — social media posters, email
                templates, brochures, and motion graphics for product launches.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://www.linkedin.com/in/ss861507/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline underline-offset-4 hover:text-[#2563EB] transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.behance.net/Ssuresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline underline-offset-4 hover:text-[#2563EB] transition-colors"
                >
                  Behance ↗
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <InfoCard label="Things I Love">
                <div className="flex flex-wrap gap-2">
                  {LOVES.map((item) => (
                    <span
                      key={item}
                      className="text-sm border border-[#ddd] px-3 py-1 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </InfoCard>

              <InfoCard label="Education">
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-sm">Master of Business Administration</div>
                    <div className="text-sm text-[#888]">
                      Kalasalingam University · CGPA 7.9 · 2018–2020
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">B.Com CA (Computer Application)</div>
                    <div className="text-sm text-[#888]">VHNSN College · CGPA 6.7 · 2015–2018</div>
                  </div>
                </div>
              </InfoCard>

              <InfoCard label="Design Tools">
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="text-sm bg-[#f5f5f5] px-3 py-1 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="02" label="Experience" title="Where I've Worked" />
          <div className="mt-12">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceItem key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader number="03" label="Skills" title="What I Do" />
        </div>

        {/* Marquee ticker */}
        <div className="relative overflow-hidden py-5 border-y border-[#e5e5e5] mt-12 mb-14">
          <div className="marquee-track flex whitespace-nowrap">
            {DOUBLED_SKILLS.map((skill, i) => (
              <span
                key={i}
                className="shrink-0 px-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {skill}
                <span className="mx-4" style={{ color: "var(--color-accent)" }}>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILLS_LIST.map((skill) => (
              <div
                key={skill}
                className="border border-[#e5e5e5] px-4 py-3 text-sm font-medium hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Social media stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "100+", label: "LinkedIn Posters" },
              { value: "80+", label: "Instagram Posters" },
              { value: "80+", label: "Blog Banners" },
              { value: "25+", label: "Instagram Reels" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-[#e5e5e5] p-6 text-center group hover:border-[#2563EB] transition-colors"
              >
                <div
                  className="leading-none mb-2 group-hover:text-[#2563EB] transition-colors"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "2.25rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#666]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / PROJECTS ── */}
      <section id="work" className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="04" label="Work" title="Selected Projects" />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="05" label="Contact" title="Let's Work Together" />

          <div className="mt-12 grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-lg text-[#555] leading-relaxed mb-10">
                I'm currently open to new opportunities. Whether you have a
                project in mind or just want to say hello — my inbox is always
                open.
              </p>

              <div className="space-y-6">
                {[
                  { label: "Email", value: "ss861507@gmail.com", href: "mailto:ss861507@gmail.com" },
                  { label: "Phone", value: "+91 8778433934", href: "tel:+918778433934" },
                  { label: "Location", value: "Bengaluru, India", href: "" },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-xs tracking-[0.2em] uppercase text-[#888] block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-medium hover:text-[#2563EB] transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-lg font-medium">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-3">
                {[
                  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/ss861507/" },
                  { label: "Behance ↗", href: "https://www.behance.net/Ssuresh" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-[#ddd] px-5 py-2.5 font-medium hover:border-[#111] hover:bg-[#111] hover:text-white transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div>
              {submitted ? (
                <div className="border border-[#e5e5e5] p-10 text-center">
                  <div
                    className="text-5xl mb-4"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}
                  >
                    ✓
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-[#666] text-sm">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: "Name", type: "text", field: "name", placeholder: "Your Name" },
                    { label: "Email", type: "email", field: "email", placeholder: "your@email.com" },
                  ].map((input) => (
                    <div key={input.field}>
                      <label className="text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        required
                        value={formData[input.field as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [input.field]: e.target.value })
                        }
                        className="w-full border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors bg-white"
                        placeholder={input.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#111] transition-colors resize-none bg-white"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#111] text-white py-3.5 text-sm font-medium hover:bg-[#2563EB] transition-colors"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── NAME MARQUEE BAND ── */}
      <div className="relative overflow-hidden py-6 bg-[#111] select-none">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="shrink-0 px-8 text-white/80"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              SURESH S
              <span className="mx-6 text-[#2563EB]">✦</span>
              UI/UX DESIGNER
              <span className="mx-6 text-[#2563EB]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e5e5e5] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#888]">
          <span className="flex items-center gap-1">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "#111" }}>Suresh</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "var(--color-accent)" }}>S.</span>
          </span>
          <span>© 2026 Suresh S — UI/UX Designer, Bengaluru</span>
          <div className="flex gap-6">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/ss861507/" },
              { label: "Behance", href: "https://www.behance.net/Ssuresh" },
              { label: "Email", href: "mailto:ss861507@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionHeader({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-5">
      <span
        className="leading-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
          color: "#ebebeb",
          letterSpacing: "-0.04em",
        }}
      >
        {number}
      </span>
      <div className="mt-2">
        <span className="text-xs tracking-[0.25em] uppercase text-[#888] block mb-1.5">{label}</span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#e5e5e5] p-5">
      <div className="text-xs tracking-[0.2em] uppercase text-[#888] mb-3">{label}</div>
      {children}
    </div>
  );
}

function ExperienceItem({
  exp,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#e5e5e5] last:border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-start gap-5 text-left group"
      >
        <span
          className="shrink-0 mt-0.5 w-8 text-sm"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#ccc" }}
        >
          {exp.id}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3
                className="group-hover:text-[#2563EB] transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {exp.company}
              </h3>
              <span className="text-sm text-[#888]">
                {exp.role} · {exp.location}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-[#888]">{exp.period}</span>
              <span className="text-xl text-[#bbb] group-hover:text-[#111] transition-colors leading-none">
                {open ? "−" : "+"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {exp.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-[#f0f0f0] text-[#666]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      {open && (
        <div className="pl-13 pb-6 ml-[3.25rem] border-l-2 border-[#e5e5e5] pl-6">
          <p className="text-[#555] text-sm mb-4 leading-relaxed">{exp.description}</p>
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#666]">
                <span className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div className="relative border border-[#e5e5e5] p-6 group hover:border-[#2563EB] hover:shadow-lg transition-all duration-300 bg-white overflow-hidden" data-hover>
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-[#2563EB]"
      />
      {/* Background tint on hover */}
      <div className="absolute inset-0 bg-[#2563EB]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-4">
        <div>
          <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-accent)" }}>
            {project.company}
          </div>
          <h3
            className="group-hover:text-[#2563EB] transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>
        </div>
        <span className="text-xs bg-[#f5f5f5] group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] px-2 py-1 text-[#666] shrink-0 ml-3 transition-colors">
          {project.stats}
        </span>
      </div>
      <p className="relative text-sm text-[#666] leading-relaxed mb-4">{project.description}</p>
      <div className="relative flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs border border-[#e5e5e5] px-2 py-0.5 text-[#888] group-hover:border-[#2563EB]/30 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
