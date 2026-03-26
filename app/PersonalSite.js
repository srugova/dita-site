"use client";
import { useState, useEffect, useRef } from "react";

const ACCENT = "#E8505B";
const DARK = "#1A1A2E";
const LIGHT = "#FAFAF9";
const MUTED = "#94A3B8";
const WARM = "#F5F0EB";

const ROLLING_WORDS = ["make sense", "drive decisions", "tell stories", "build products", "spark ideas"];

const DEFAULT_PROJECTS = [
  {
    id: "querymind",
    title: "QueryMind",
    tag: "AI Tool",
    desc: "Too lazy to write SQL? Same. So I built a tool that turns plain English into queries. Privacy-first too — your actual data never leaves the building.",
    tech: ["Python", "Anthropic API", "Claude Code"],
    emoji: "🧠",
    detail: {
      tagline: "Ask in English. Get SQL. Keep your data private.",
      story: "At work, I kept getting requests like \"hey can you pull the top 10 products by revenue last month?\" — and every time I'd write the same kind of SQL with minor tweaks. So I thought: what if the non-technical folks could just... ask?\n\nQueryMind turns natural language questions into SQL queries using Claude's API. But here's the thing I'm most proud of — it only sends your database schema (table names, column names, types) to the API. Your actual data never leaves your environment. Privacy-first by design.",
      role: "Solo builder — ideation, architecture, development, documentation",
      impact: "Reduced ad hoc SQL request turnaround from hours to seconds. Built internal documentation and a corporate pitch deck for leadership.",
      links: [{ label: "GitHub", url: "https://github.com/srugova" }],
    },
  },
  {
    id: "rec-engine",
    title: "Personalized Rec Engine",
    tag: "ML / Data",
    desc: "Built a \"you might also like\" engine for an e-commerce platform. Tracks what you browse, wishlist, and fave — then serves 20 personalized picks every night while you sleep.",
    tech: ["Python", "Redshift", "SQL"],
    emoji: "🎯",
    detail: {
      tagline: "Collaborative filtering that actually ships to production.",
      story: "The platform had zero personalization — everyone saw the same homepage. I built a recommendation engine using Jaccard similarity across three behavioral signals: favorite categories (5pts), wishlisted items (2pts), and recently viewed (3pts).\n\nThe pipeline generates top 100 candidates per user, shows 20 randomly to keep it fresh, and runs a nightly TRUNCATE+INSERT at 2am on Redshift. For new users with no history (cold start), it falls back to a 7-day trending algorithm.",
      role: "End-to-end: research, algorithm design, pipeline development, deployment",
      impact: "First-ever personalized experience on the platform. Increased click-through rates on homepage product cards.",
      links: [],
    },
  },
  {
    id: "catalog-matcher",
    title: "Catalog Item Matcher",
    tag: "Data Tool",
    desc: "Matching messy catalog data across platforms is pain. This two-pass matcher (exact + fuzzy) does it so I don't have to cry in spreadsheets anymore.",
    tech: ["Python", "GitHub Actions"],
    emoji: "🔗",
    detail: {
      tagline: "Two-pass matching so I don't have to cry in spreadsheets.",
      story: "When you run a digital library across multiple platforms, catalog data gets messy fast. Titles don't match exactly, ISBNs are sometimes missing, and manual reconciliation takes forever.\n\nI built a two-pass matching system: first pass does exact string matching on key identifiers, second pass uses Levenshtein distance for fuzzy matches on titles and authors. The tool outputs a confidence-scored match report that the team can review and approve.",
      role: "Solo builder — problem definition, development, deployment",
      impact: "Reduced catalog reconciliation time from days to minutes. Open-sourced on GitHub.",
      links: [{ label: "GitHub", url: "https://github.com/srugova/SmartLibItemMatcher" }],
    },
  },
  {
    id: "dw-redesign",
    title: "Data Warehouse Redesign",
    tag: "Data Engineering",
    desc: "Audited a production data warehouse. Found 37% negative reading minutes (??). Designed a whole new star schema from scratch, complete with a 14-week rescue plan.",
    tech: ["Redshift", "SQL", "Jira"],
    emoji: "🏗️",
    detail: {
      tagline: "Found the horrors. Designed the fix. Made the roadmap.",
      story: "I was asked to \"just check if the data looks okay\" in our Redshift data warehouse. Spoiler: it did not.\n\nThe audit uncovered: INTEGER overflow causing 37% negative values in total_reading_minutes, ALL foreign key columns in the fact table were empty strings (zero joins possible), SCD2 duplicates in the content dimension, and a subscription fact table that only tracked one organization.\n\nI produced audit decks, SQL playbooks, Jupyter notebooks, and designed a completely new star schema dimensional model — with DDL, ETL logic, Jira epics/stories, and a 14-week implementation roadmap.",
      role: "Lead: audit, schema design, documentation, roadmap planning, engineer grooming sessions",
      impact: "Uncovered critical data quality issues affecting business reporting. Provided a clear path from broken to production-ready.",
      links: [],
    },
  },
  {
    id: "greenspot",
    title: "GreenSpot (GRNSPOT)",
    tag: "Thesis / Full-Stack",
    desc: "My Master's thesis turned real product — a geospatial decision-support system for monitoring urban green spaces in Jabodetabek. AHP-based environmental scoring, real-time AQI data, interactive maps. Live at grnspot.id.",
    tech: ["Vue.js", "PostGIS", "Express.js", "AWS", "Python"],
    emoji: "🌿",
    detail: {
      tagline: "A thesis that became a real, deployed product.",
      story: "Jakarta's green space coverage is below 10% — way under the legally mandated 30%. But there was no centralized tool for planners to actually monitor this.\n\nGreenSpot (GRNSPOT) is a web-based decision-support system I built for my Monash Master's thesis. It integrates real-time AQI data from AQICN, green space coverage from KLHK, population data from BPS, and spatial data from OpenStreetMap — all into an interactive map with an AHP-based environmental scoring engine.\n\nPlanners can filter by city, see composite environment scores, and identify which areas need intervention most. The system was validated across 5 Jabodetabek cities with stakeholder feedback from Jakarta's parks department, Bappeda Depok, and NGOs like Walhi.",
      role: "Sole researcher & developer. Supervised by Dr. Muhamad Risqi Saputra.",
      impact: "Deployed at grnspot.id. Validated with government stakeholders. Presented comprehensive policy recommendations for Indonesia's green space regulations.",
      links: [{ label: "Live Site", url: "https://grnspot.id" }],
    },
  },
  {
    id: "asuh-asih-asah",
    title: "Asuh Asih Asah",
    tag: "Social Impact",
    desc: "An adoption support platform born from an LPDP business competition. Tackling the gap between kids ready for adoption and families who actually adopt — through education, consulting, and community.",
    tech: ["Product Strategy", "Research", "LPDP"],
    emoji: "💛",
    detail: {
      tagline: "Bridging the adoption gap in Indonesia.",
      story: "Indonesia has a significant gap between children ready for adoption and families who successfully adopt. The reasons are complex — stigma, bureaucratic complexity, lack of information access, and insufficient support systems.\n\nAsuh Asih Asah was born from the LPDP 5ME2045 Business Competition. We designed a platform concept that combines adoption education, process consulting, and community support to help prospective parents navigate the journey.\n\nOur approach was validated with Kemensos data and judge feedback, leading to a refined strategy focusing on awareness campaigns, streamlined consulting services, and partnerships with adoption agencies.",
      role: "Team member — research, product strategy, pitch presentation",
      impact: "Competed in LPDP Business Competition. Validated problem-solution fit with government data and judge panel feedback.",
      links: [],
    },
  },
];

const DEFAULT_POSTS = [
  {
    id: "newsgathering-paper",
    title: "Revolutionizing Newsgathering: Digital Media & New Technologies",
    date: "Oct 2024",
    tag: "Published Paper",
    preview: "Presented at The Asian Conference on Media, Communication & Film 2024 in Japan. Mixed-methods research on AI, ML, and data analytics in journalism.",
    featured: true,
    detail: {
      tagline: "My first international conference paper — presented in Japan.",
      body: "This paper explores how digital media and new technologies are fundamentally changing the way journalists gather news. I used a mixed-methods approach: quantitative surveys with media professionals and qualitative in-depth interviews with reporters and editors.\n\nThe research covers the integration of AI, machine learning, and data analytics into journalism — how these tools help process large datasets, identify trends, and verify information (which is critical for fighting disinformation).\n\nKey findings showed that digital tools have significantly increased both the speed and accuracy of reporting across media organizations. But there's a catch — ethical concerns around privacy, algorithmic bias, and data security are still largely unaddressed. Most journalists said they need more training to handle these challenges effectively.\n\nThe paper also examines how social media has become both a powerful real-time newsgathering tool and a major source of disinformation — a double-edged sword that requires better verification tools.\n\nPresented at The Asian Conference on Media, Communication & Film (MediAsia) 2024 in Japan. Published in the official IAFOR conference proceedings.",
      venue: "MediAsia 2024 — IAFOR, Japan",
      funded: "LPDP (Indonesia Endowment Fund for Education)",
      links: [],
    },
  },
  {
    id: "dw-audit",
    title: "I Audited a Data Warehouse and It Was Worse Than I Thought",
    date: "Mar 2026",
    tag: "Data Engineering",
    preview: "37% negative values in a 'reading minutes' column. Foreign keys that were literally empty strings. A horror story with a happy ending.",
    detail: {
      tagline: "A data horror story with a happy ending.",
      body: "I was asked to \"check if the data looks right\" in our Redshift data warehouse. What I found was... not right.\n\nThe audit uncovered several critical issues: an INTEGER overflow causing 37% of reading minutes to be negative (yes, negative time spent reading), ALL foreign key columns in the main fact table were empty strings meaning zero joins were possible, SCD2 duplicates flooding the content dimension table, and a subscription fact table that somehow only tracked a single organization.\n\nI documented everything — audit decks for stakeholders, SQL playbooks for the team, and Jupyter notebooks with reproducible queries. Then I designed a completely new star schema from scratch with proper DDL, ETL logic, and a 14-week implementation roadmap.\n\nThe lesson? Always audit before you build. And if someone says \"the data is fine\" — verify it yourself.",
      links: [],
    },
  },
  {
    id: "querymind-privacy",
    title: "How I Built an AI Tool Without Leaking Company Data",
    date: "Feb 2026",
    tag: "AI / Privacy",
    preview: "QueryMind sends schema only, never actual data. Here's the architecture and why your boss should care.",
    detail: {
      tagline: "Privacy-first AI is not just a buzzword — here's how I actually did it.",
      body: "When I built QueryMind (a natural language to SQL tool), the biggest concern from leadership wasn't \"will it work?\" — it was \"will our data be safe?\"\n\nFair question. Most AI tools require you to send your actual data to an external API. QueryMind doesn't. Here's how:\n\nThe tool only sends your database schema to the Anthropic API — table names, column names, data types, and relationships. That's it. Your actual rows of data never leave your environment. The API generates the SQL query based on the schema, and the query runs locally against your database.\n\nThis means even if the API were compromised, the most an attacker would learn is that you have a table called 'users' with a column called 'email'. They'd never see the actual emails.\n\nI also built documentation explaining this architecture in plain language — because if your stakeholders can't understand why it's safe, it doesn't matter how safe it actually is.\n\nThe corporate deck I made for leadership included a privacy architecture diagram, data flow visualization, and comparison with other approaches. It got approved.",
      links: [],
    },
  },
  {
    id: "cold-start-recs",
    title: "Your Cold Start Recs Shouldn't Live With Your Personalized Ones",
    date: "Jan 2026",
    tag: "Machine Learning",
    preview: "I learned this the hard way. Here's why I split the pipeline and how you can too.",
    detail: {
      tagline: "I learned this the hard way so you don't have to.",
      body: "When I first built the recommendation engine, everything lived in one pipeline. Personalized recommendations for users with history, and a trending fallback for new users — all mixed together in the same job, same table, same logic.\n\nIt worked... until it didn't. The problems started showing up gradually:\n\nThe trending fallback was computed from the same behavioral signals as personalized recs, but with completely different logic. Debugging was a nightmare because you couldn't tell if a recommendation was personalized or trending without tracing through the entire pipeline.\n\nRefresh cycles were different — personalized recs needed nightly updates, but trending could benefit from more frequent refreshes. Tying them together meant compromising on both.\n\nThe cold-start transition (when a new user gets enough history to switch to personalized) was fragile. Edge cases everywhere.\n\nSo I split them. Separate pipelines, separate staging tables, separate refresh schedules. The cold start pipeline uses a 7-day trending window with nightly refresh. The personalized pipeline runs independently. A simple routing layer decides which one to serve based on user history.\n\nThe result? Easier debugging, independent scaling, cleaner transitions, and fewer 2am alerts.",
      links: [],
    },
  },
];

const STORAGE_KEY = "dita-site-data";

const NavDot = ({ active }) => (
  <div
    style={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: active ? ACCENT : "transparent",
      border: `2px solid ${active ? ACCENT : MUTED}`,
      transition: "all 0.3s ease",
    }}
  />
);

const Tag = ({ children, color = ACCENT }) => (
  <span
    style={{
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: color,
      background: `${color}15`,
      padding: "4px 10px",
      borderRadius: 20,
      fontFamily: "'DM Mono', monospace",
    }}
  >
    {children}
  </span>
);

const SectionTitle = ({ children, index }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        color: ACCENT,
        fontWeight: 500,
      }}
    >
      {index}
    </span>
    <div style={{ width: 40, height: 1, background: ACCENT }} />
    <h2
      style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: MUTED,
        margin: 0,
      }}
    >
      {children}
    </h2>
  </div>
);

export default function PersonalSite() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCMS, setShowCMS] = useState(false);
  const [cmsAuthenticated, setCmsAuthenticated] = useState(false);
  const [cmsPassword, setCmsPassword] = useState("");
  const [cmsPassError, setCmsPassError] = useState(false);
  const [cmsTab, setCmsTab] = useState("projects");
  const [cmsMsg, setCmsMsg] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const containerRef = useRef(null);

  const CMS_HASH = "3dfd023f5311efe646c53cb50a079776614053a8c7e5eb2f60a4d08ffbdd9107";

  const hashPassword = async (pw) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pw);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleCmsLogin = async () => {
    const h = await hashPassword(cmsPassword);
    if (h === CMS_HASH) {
      setCmsAuthenticated(true);
      setCmsPassError(false);
    } else {
      setCmsPassError(true);
      setTimeout(() => setCmsPassError(false), 2000);
    }
  };

  const openCMS = () => {
    setShowCMS(true);
    setCmsPassword("");
    setCmsPassError(false);
  };

  // Editable data state
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [blogPosts, setBlogPosts] = useState(DEFAULT_POSTS);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const res = (() => { try { const v = localStorage.getItem(STORAGE_KEY); return v ? {value: v} : null; } catch(e) { return null; } })();
        if (res && res.value) {
          const d = JSON.parse(res.value);
          if (d.projects) setProjects(d.projects);
          if (d.blogPosts) setBlogPosts(d.blogPosts);
        }
      } catch (e) { /* first load, no data yet */ }
    })();
  }, []);

  // Save helper
  const saveData = async (p, b) => {
    try {
      (() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: p, blogPosts: b })); return {value: true}; } catch(e) { return null; } })();
      setCmsMsg("Saved!");
      setTimeout(() => setCmsMsg(""), 2000);
    } catch (e) { setCmsMsg("Error saving"); }
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROLLING_WORDS.length);
        setWordFade(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrollY(container.scrollTop);
      const sections = ["hero", "work", "blog", "about", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) setActiveSection(id);
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    const container = containerRef.current;
    if (el && container) {
      const top = el.offsetTop;
      container.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const navItems = [
    { id: "work", label: "Work" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
    { id: "contact", label: "Say Hi" },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        background: LIGHT,
        color: DARK,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::selection {
          background: ${ACCENT}30;
          color: ${DARK};
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes expandLine {
          from { width: 0; }
          to { width: 60px; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }
        .delay-7 { animation-delay: 0.7s; }

        .project-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-4px);
        }

        .blog-row {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .blog-row:hover {
          transform: translateX(6px);
          background: ${WARM} !important;
          border-left-color: ${ACCENT} !important;
        }
        .blog-row:hover span:last-child {
          color: ${ACCENT} !important;
        }

        .nav-link {
          transition: color 0.3s ease;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
        }
        .nav-link:hover {
          color: ${ACCENT} !important;
        }

        .social-link {
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .social-link:hover {
          color: ${ACCENT} !important;
          transform: translateY(-2px);
        }

        .cta-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px ${ACCENT}40;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 48px !important; }
          .section-padding { padding: 80px 24px !important; }
          .project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrollY > 100 ? `${LIGHT}EE` : "transparent",
          backdropFilter: scrollY > 100 ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 22,
            fontWeight: 400,
            fontStyle: "italic",
            color: DARK,
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.02em",
          }}
        >
          dita<span style={{ color: ACCENT }}>.</span>
        </button>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-link"
              onClick={() => scrollTo(item.id)}
              style={{
                color: activeSection === item.id ? ACCENT : MUTED,
                padding: 0,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* SIDE NAV DOTS */}
      <div
        style={{
          position: "fixed",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 100,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease 1s",
        }}
      >
        {["hero", "work", "blog", "about", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
          >
            <NavDot active={activeSection === id} />
          </button>
        ))}
      </div>

      {/* HERO */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: -50,
            width: 200,
            height: 200,
            border: `1px solid ${ACCENT}15`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 900 }}>
          <div className={loaded ? "fade-up delay-1" : ""} style={{ opacity: 0 }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: ACCENT,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ADE80",
                  boxShadow: "0 0 8px #4ADE8060",
                }}
              />{" "}
              probably building something rn
            </span>
          </div>

          <h1
            className={`hero-title ${loaded ? "fade-up delay-2" : ""}`}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 82,
              fontWeight: 400,
              lineHeight: 1.05,
              marginTop: 32,
              letterSpacing: "-0.03em",
              color: DARK,
              opacity: 0,
            }}
          >
            Hi, I'm Dita
            <span style={{ color: ACCENT }}>.</span>
            <br />
            <span style={{ fontStyle: "italic", color: MUTED }}>
              I make data
            </span>
            <br />
            <span
              style={{
                display: "inline-block",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: wordFade ? 1 : 0,
                transform: wordFade ? "translateY(0)" : "translateY(16px)",
                minWidth: 300,
              }}
            >
              {ROLLING_WORDS[wordIndex]}
            </span>
            <span
              style={{
                display: "inline-block",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: wordFade ? 1 : 0,
                transform: wordFade ? "scale(1)" : "scale(0.5)",
                marginLeft: 8,
                fontSize: 64,
              }}
            >
              ✨
            </span>
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 60,
                background: ACCENT,
                marginLeft: 4,
                verticalAlign: "middle",
                animation: "blink 1s infinite",
              }}
            />
          </h1>

          <p
            className={loaded ? "fade-up delay-4" : ""}
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: MUTED,
              maxWidth: 560,
              marginTop: 32,
              opacity: 0,
            }}
          >
            Data lead by day, content creator by night, permanently caffeinated.
            I build rec engines, wrangle data warehouses, and make AI tools
            at Gramedia Digital — then talk about it all on{" "}
            <a href="https://instagram.com/ditalovesdata" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 500, textDecoration: "none" }}>@ditalovesdata</a>.
            <br />
            Monash Data Science grad. Jakarta-based. Probably debugging something right now.
          </p>

          <div
            className={loaded ? "fade-up delay-5" : ""}
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              opacity: 0,
            }}
          >
            <button
              className="cta-btn"
              onClick={() => scrollTo("work")}
              style={{
                background: ACCENT,
                color: "white",
                border: "none",
                padding: "14px 32px",
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              See my work ↓
            </button>
            <button
              className="cta-btn"
              onClick={() => scrollTo("contact")}
              style={{
                background: "transparent",
                color: DARK,
                border: `1.5px solid ${DARK}20`,
                padding: "14px 32px",
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Scroll indicator - bottom right */}
        <div
          className={loaded ? "fade-up delay-7" : ""}
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: MUTED,
              letterSpacing: "0.1em",
              writingMode: "vertical-lr",
            }}
          >
            SCROLL
          </span>
        </div>

      </section>

      {/* WORK */}
      <section
        id="work"
        className="section-padding"
        style={{
          padding: "120px 60px",
          background: LIGHT,
        }}
      >
        <SectionTitle index="01">Stuff I've Built</SectionTitle>

        <div
          className="project-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => { setSelectedProject(project); containerRef.current?.scrollTo({ top: 0 }); }}
              style={{
                background: hoveredProject === i ? "white" : WARM,
                borderRadius: 16,
                padding: 36,
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${hoveredProject === i ? `${ACCENT}30` : "transparent"}`,
                gridColumn: i === projects.length - 1 && projects.length % 2 === 1 ? "1 / -1" : "auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -10,
                  fontSize: 80,
                  opacity: hoveredProject === i ? 0.15 : 0.08,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }}
              >
                {project.emoji}
              </div>

              <Tag>{project.tag}</Tag>

              <h3
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 28,
                  fontWeight: 400,
                  marginTop: 16,
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: MUTED,
                  marginBottom: 20,
                }}
              >
                {project.desc}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: DARK,
                      background: `${DARK}08`,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section
        id="blog"
        className="section-padding"
        style={{
          padding: "120px 60px",
          background: "white",
        }}
      >
        <SectionTitle index="02">Things I Yap About</SectionTitle>

        <div>
          {blogPosts.map((post, i) => (
            <div
              key={i}
              className="blog-row"
              onClick={() => { setSelectedPost(post); containerRef.current?.scrollTo({ top: 0 }); }}
              style={{
                padding: "28px 24px",
                borderBottom: `1px solid ${DARK}08`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 24,
                borderRadius: 12,
                background: "transparent",
                borderLeft: "3px solid transparent",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <Tag color={post.featured ? "#D97706" : ACCENT}>{post.tag}</Tag>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      color: MUTED,
                    }}
                  >
                    {post.date}
                  </span>
                  {post.featured && (
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: "#D97706",
                      background: "#D9770612",
                      padding: "2px 8px",
                      borderRadius: 10,
                    }}>
                      🇯🇵 IAFOR Conference
                    </span>
                  )}
                </div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 22,
                    fontWeight: 400,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                  {post.preview}
                </p>
              </div>
              <span
                style={{
                  fontSize: 20,
                  color: MUTED,
                  marginTop: 30,
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = "https://www.youtube.com/@DitaDitaDitaDitaDita";
              a.target = "_blank";
              a.rel = "noopener noreferrer";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: ACCENT,
              cursor: "pointer",
              textDecoration: "none",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            Also yapping on YouTube — It's Dita! →
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-padding"
        style={{
          padding: "120px 60px",
          background: LIGHT,
        }}
      >
        <SectionTitle index="03">The Lore</SectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: DARK,
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                marginBottom: 24,
              }}
            >
              Part data person, part product person, part content creator,
              and still not choosing just one lane (and maybe I never will).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUTED, marginBottom: 16 }}>
              I lead Product Data & Insights at Gramedia Digital — basically I'm
              the person who builds the data infrastructure, ML pipelines, and
              internal tools for Indonesia's biggest book ecosystem. My team of
              five handles everything from warehouse design to ad hoc "hey can
              you pull this data real quick" requeststhose “quick data pulls” that are… never actually quick.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUTED, marginBottom: 16 }}>
              I hold a Master’s degree in Data Science from Monash University, supported by the LPDP scholarship.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUTED }}>
              These days, I split my time between building, thinking, and sharing about data & AI.
            </p>
          </div>

          <div
            style={{
              background: WARM,
              borderRadius: 16,
              padding: 36,
            }}
          >
            <h4
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: ACCENT,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Quick Stats
            </h4>

            {[
              ["Based in", "Jakarta 🇮🇩"],
              ["Day job", "Lead, Product Data & Insights"],
              ["Where", "Gramedia Digital"],
              ["Studied at", "Monash Uni (MSc Data Science)"],
              ["Content", "It's Dita! — YouTube & IG"],
              ["Side quest", "@ditalovesdata — Data & AI Services"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: `1px solid ${DARK}08`,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500, textAlign: "right" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "120px 60px 80px",
          background: DARK,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 600 }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: ACCENT,
              letterSpacing: "0.15em",
            }}
          >
            04 — SAY HI
          </span>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 52,
              fontWeight: 400,
              marginTop: 24,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Got an idea?
            <br />
            <span style={{ fontStyle: "italic", color: MUTED }}>
              I'm down to chat<span style={{ color: ACCENT }}>.</span>
            </span>
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: `${MUTED}`,
              marginTop: 24,
              marginBottom: 40,
            }}
          >
            Whether it's a collab, data & AI help, or you just wanna say
            hi — slide into my{" "}
            <a href="https://instagram.com/ditalovesdata" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none" }}>DMs</a>{" "}
            or hit me up via email. I don't bite (unless it's an unindexed foreign key).
          </p>

          <a
            href="mailto:ditadata@gmail.com"
            className="cta-btn"
            style={{
              background: ACCENT,
              color: "white",
              border: "none",
              padding: "16px 36px",
              borderRadius: 40,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              marginBottom: 48,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ditadata@gmail.com →
          </a>

          <div
            style={{
              display: "flex",
              gap: 32,
              paddingTop: 32,
              borderTop: `1px solid ${LIGHT}15`,
            }}
          >
            {[
              { name: "LinkedIn", url: "https://linkedin.com/in/dita" },
              { name: "YouTube", url: "https://www.youtube.com/@DitaDitaDitaDitaDita" },
              { name: "Instagram", url: "https://instagram.com/ditalovesdata" },
              { name: "GitHub", url: "https://github.com/srugova" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: MUTED,
                  display: "inline-block",
                }}
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 80,
            paddingTop: 24,
            borderTop: `1px solid ${LIGHT}10`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 18,
              fontStyle: "italic",
              color: `${LIGHT}40`,
            }}
          >
            dita<span style={{ color: ACCENT }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: `${LIGHT}30`,
            }}
          >
            © 2026 — made with ☕ and questionable <span onClick={openCMS} style={{ cursor: "text" }}>sleep</span> habits
          </span>
        </div>
      </section>

      {/* PROJECT DETAIL PAGE */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: LIGHT,
            zIndex: 200,
            overflowY: "auto",
            animation: "fadeIn 0.3s ease",
          }}
        >
          {/* Back nav */}
          <nav
            style={{
              position: "sticky",
              top: 0,
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: `${LIGHT}EE`,
              backdropFilter: "blur(20px)",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: ACCENT,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ← Back to all projects
            </button>
            <Tag>{selectedProject.tag}</Tag>
          </nav>

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 40px 120px" }}>
            {/* Header */}
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 64, display: "block", marginBottom: 16 }}>
                {selectedProject.emoji}
              </span>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 48,
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                {selectedProject.title}
              </h1>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 20,
                  fontStyle: "italic",
                  color: MUTED,
                  lineHeight: 1.5,
                }}
              >
                {selectedProject.detail.tagline}
              </p>
            </div>

            {/* Tech stack */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: DARK,
                    background: `${DARK}08`,
                    padding: "6px 14px",
                    borderRadius: 8,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Story */}
            <div style={{ marginBottom: 48 }}>
              <h3
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: ACCENT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                The Story
              </h3>
              {selectedProject.detail.story.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: DARK,
                    marginBottom: 16,
                    opacity: 0.85,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Role & Impact */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  background: WARM,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  My Role
                </h4>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: DARK }}>
                  {selectedProject.detail.role}
                </p>
              </div>
              <div
                style={{
                  background: WARM,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Impact
                </h4>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: DARK }}>
                  {selectedProject.detail.impact}
                </p>
              </div>
            </div>

            {/* Links */}
            {selectedProject.detail.links.length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <h3
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: ACCENT,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Links
                </h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {selectedProject.detail.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-btn"
                      style={{
                        background: ACCENT,
                        color: "white",
                        border: "none",
                        padding: "12px 28px",
                        borderRadius: 40,
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                background: "transparent",
                color: MUTED,
                border: `1.5px solid ${DARK}15`,
                padding: "12px 28px",
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
            >
              ← Back to home
            </button>
          </div>
        </div>
      )}

      {/* BLOG POST DETAIL PAGE */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: LIGHT,
            zIndex: 200,
            overflowY: "auto",
            animation: "fadeIn 0.3s ease",
          }}
        >
          {/* Back nav */}
          <nav
            style={{
              position: "sticky",
              top: 0,
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: `${LIGHT}EE`,
              backdropFilter: "blur(20px)",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: ACCENT,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ← Back to all posts
            </button>
            <Tag color={selectedPost.featured ? "#D97706" : ACCENT}>{selectedPost.tag}</Tag>
          </nav>

          <article style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 120px" }}>
            {/* Header */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: MUTED,
                  }}
                >
                  {selectedPost.date}
                </span>
                {selectedPost.featured && (
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: "#D97706",
                    background: "#D9770612",
                    padding: "3px 10px",
                    borderRadius: 10,
                  }}>
                    🇯🇵 IAFOR Conference
                  </span>
                )}
              </div>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 42,
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                {selectedPost.title}
              </h1>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 20,
                  fontStyle: "italic",
                  color: MUTED,
                  lineHeight: 1.5,
                }}
              >
                {selectedPost.detail.tagline}
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: 40, height: 2, background: ACCENT, marginBottom: 40 }} />

            {/* Body */}
            {selectedPost.detail.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: DARK,
                  marginBottom: 20,
                  opacity: 0.85,
                }}
              >
                {para}
              </p>
            ))}

            {/* Meta info for paper */}
            {selectedPost.detail.venue && (
              <div
                style={{
                  background: WARM,
                  borderRadius: 12,
                  padding: 24,
                  marginTop: 40,
                  marginBottom: 40,
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Venue
                  </span>
                  <p style={{ fontSize: 14, marginTop: 4, color: DARK }}>{selectedPost.detail.venue}</p>
                </div>
                {selectedPost.detail.funded && (
                  <div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: ACCENT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      Funded by
                    </span>
                    <p style={{ fontSize: 14, marginTop: 4, color: DARK }}>{selectedPost.detail.funded}</p>
                  </div>
                )}
              </div>
            )}

            {/* Links */}
            {selectedPost.detail.links && selectedPost.detail.links.length > 0 && (
              <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
                {selectedPost.detail.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                    style={{
                      background: ACCENT,
                      color: "white",
                      border: "none",
                      padding: "12px 28px",
                      borderRadius: 40,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            )}

            {/* Back button */}
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: "transparent",
                color: MUTED,
                border: `1.5px solid ${DARK}15`,
                padding: "12px 28px",
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                marginTop: 20,
              }}
            >
              ← Back to home
            </button>
          </article>
        </div>
      )}

      {/* ===== CMS PANEL ===== */}
      {showCMS && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: LIGHT, zIndex: 300, overflowY: "auto",
          fontFamily: "'DM Sans', sans-serif",
        }}>

          {/* PASSWORD SCREEN */}
          {!cmsAuthenticated && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              height: "100%", gap: 20,
            }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontStyle: "italic" }}>
                CMS<span style={{ color: ACCENT }}>.</span>
              </span>
              <p style={{ fontSize: 14, color: MUTED, marginBottom: 8 }}>Enter password to continue</p>
              <input
                type="password"
                value={cmsPassword}
                onChange={e => setCmsPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleCmsLogin()}
                placeholder="Password"
                autoFocus
                style={{
                  width: 280, padding: "12px 16px", borderRadius: 10,
                  border: `1.5px solid ${cmsPassError ? ACCENT : `${DARK}15`}`,
                  fontSize: 15, fontFamily: "'DM Mono', monospace", outline: "none",
                  background: "white", textAlign: "center", letterSpacing: "0.15em",
                  transition: "border-color 0.3s ease",
                }}
              />
              {cmsPassError && (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: ACCENT }}>
                  wrong password, try again
                </span>
              )}
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button onClick={handleCmsLogin} style={{
                  padding: "10px 28px", borderRadius: 8, cursor: "pointer",
                  background: ACCENT, color: "white", border: "none", fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                }}>Enter</button>
                <button onClick={() => setShowCMS(false)} style={{
                  padding: "10px 28px", borderRadius: 8, cursor: "pointer",
                  background: "transparent", color: MUTED, border: `1px solid ${DARK}15`, fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                }}>Cancel</button>
              </div>
            </div>
          )}

          {/* AUTHENTICATED CMS */}
          {cmsAuthenticated && (<>
          {/* CMS Header */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: `${LIGHT}EE`, backdropFilter: "blur(20px)",
            padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
            borderBottom: `1px solid ${DARK}10`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => { setShowCMS(false); setCmsAuthenticated(false); }} style={{
                fontFamily: "'DM Mono', monospace", fontSize: 13, color: ACCENT,
                background: "none", border: "none", cursor: "pointer",
              }}>← Back to site</button>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontStyle: "italic" }}>
                CMS<span style={{ color: ACCENT }}>.</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {cmsMsg && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#4ADE80" }}>{cmsMsg}</span>}
              <button onClick={() => {
                setProjects(DEFAULT_PROJECTS);
                setBlogPosts(DEFAULT_POSTS);
                saveData(DEFAULT_PROJECTS, DEFAULT_POSTS);
              }} style={{
                fontFamily: "'DM Mono', monospace", fontSize: 12, color: MUTED,
                background: "none", border: `1px solid ${DARK}15`, padding: "6px 14px",
                borderRadius: 8, cursor: "pointer",
              }}>Reset All</button>
            </div>
          </div>

          {/* CMS Tabs */}
          <div style={{ padding: "20px 40px 0", display: "flex", gap: 4 }}>
            {["projects", "posts"].map(tab => (
              <button key={tab} onClick={() => { setCmsTab(tab); setEditIdx(null); }} style={{
                fontFamily: "'DM Mono', monospace", fontSize: 13,
                padding: "10px 20px", borderRadius: "8px 8px 0 0", cursor: "pointer",
                background: cmsTab === tab ? "white" : "transparent",
                border: cmsTab === tab ? `1px solid ${DARK}10` : "1px solid transparent",
                borderBottom: cmsTab === tab ? "1px solid white" : "none",
                color: cmsTab === tab ? DARK : MUTED, fontWeight: cmsTab === tab ? 600 : 400,
              }}>{tab === "projects" ? "Projects" : "Blog Posts"}</button>
            ))}
          </div>

          {/* CMS Content */}
          <div style={{ padding: "0 40px 120px", background: "white", margin: "0 40px", borderRadius: "0 8px 8px 8px", border: `1px solid ${DARK}10`, minHeight: 400 }}>
            
            {/* PROJECT CMS */}
            {cmsTab === "projects" && editIdx === null && (
              <div style={{ padding: "24px 0" }}>
                {projects.map((p, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: `1px solid ${DARK}06`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                        <div style={{ fontSize: 12, color: MUTED }}>{p.tag}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setEditIdx(i)} style={{
                        fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                        background: `${ACCENT}10`, color: ACCENT, border: "none",
                        fontFamily: "'DM Mono', monospace",
                      }}>Edit</button>
                      <button onClick={() => {
                        const n = projects.filter((_, j) => j !== i);
                        setProjects(n); saveData(n, blogPosts);
                      }} style={{
                        fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                        background: `${DARK}06`, color: MUTED, border: "none",
                        fontFamily: "'DM Mono', monospace",
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => {
                  const n = [...projects, {
                    id: `new-${Date.now()}`, title: "New Project", tag: "Tag", desc: "Description...",
                    tech: ["Tech"], emoji: "🆕",
                    detail: { tagline: "Tagline...", story: "Story...", role: "Role...", impact: "Impact...", links: [] },
                  }];
                  setProjects(n); setEditIdx(n.length - 1);
                }} style={{
                  marginTop: 20, padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                  background: ACCENT, color: "white", border: "none", fontSize: 13,
                  fontFamily: "'DM Mono', monospace",
                }}>+ Add Project</button>
              </div>
            )}

            {/* PROJECT EDIT FORM */}
            {cmsTab === "projects" && editIdx !== null && projects[editIdx] && (() => {
              const p = projects[editIdx];
              const update = (field, val) => {
                const n = [...projects]; n[editIdx] = { ...n[editIdx], [field]: val }; setProjects(n);
              };
              const updateDetail = (field, val) => {
                const n = [...projects]; n[editIdx] = { ...n[editIdx], detail: { ...n[editIdx].detail, [field]: val } }; setProjects(n);
              };
              const inputStyle = {
                width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${DARK}15`,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: LIGHT, outline: "none",
              };
              const labelStyle = {
                fontFamily: "'DM Mono', monospace", fontSize: 11, color: ACCENT,
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, display: "block",
              };
              return (
                <div style={{ padding: "24px 0", maxWidth: 640 }}>
                  <button onClick={() => setEditIdx(null)} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 12, color: ACCENT,
                    background: "none", border: "none", cursor: "pointer", marginBottom: 20,
                  }}>← Back to list</button>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, marginBottom: 24 }}>
                    Edit: {p.title}
                  </h3>
                  {[
                    ["Emoji", "emoji", false], ["Title", "title", false], ["Tag", "tag", false],
                    ["Description", "desc", true], ["Tech (comma-separated)", "tech", false],
                  ].map(([label, field, isTextarea]) => (
                    <div key={field} style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{label}</label>
                      {isTextarea ? (
                        <textarea value={p[field]} onChange={e => update(field, e.target.value)}
                          rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                      ) : field === "tech" ? (
                        <input value={p[field].join(", ")} onChange={e => update(field, e.target.value.split(",").map(s => s.trim()))}
                          style={inputStyle} />
                      ) : (
                        <input value={p[field]} onChange={e => update(field, e.target.value)} style={inputStyle} />
                      )}
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${DARK}08`, paddingTop: 20, marginTop: 20 }}>
                    <h4 style={{ ...labelStyle, fontSize: 12, marginBottom: 16 }}>Detail Page</h4>
                    {[
                      ["Tagline", "tagline", false], ["Story", "story", true],
                      ["Role", "role", false], ["Impact", "impact", true],
                    ].map(([label, field, isTextarea]) => (
                      <div key={field} style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>{label}</label>
                        {isTextarea ? (
                          <textarea value={p.detail[field]} onChange={e => updateDetail(field, e.target.value)}
                            rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                        ) : (
                          <input value={p.detail[field]} onChange={e => updateDetail(field, e.target.value)} style={inputStyle} />
                        )}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { saveData(projects, blogPosts); setEditIdx(null); }} style={{
                    marginTop: 12, padding: "12px 28px", borderRadius: 8, cursor: "pointer",
                    background: ACCENT, color: "white", border: "none", fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                  }}>Save & Close</button>
                </div>
              );
            })()}

            {/* BLOG POST CMS */}
            {cmsTab === "posts" && editIdx === null && (
              <div style={{ padding: "24px 0" }}>
                {blogPosts.map((p, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: `1px solid ${DARK}06`,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: MUTED }}>{p.tag} · {p.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setEditIdx(i)} style={{
                        fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                        background: `${ACCENT}10`, color: ACCENT, border: "none",
                        fontFamily: "'DM Mono', monospace",
                      }}>Edit</button>
                      <button onClick={() => {
                        const n = blogPosts.filter((_, j) => j !== i);
                        setBlogPosts(n); saveData(projects, n);
                      }} style={{
                        fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                        background: `${DARK}06`, color: MUTED, border: "none",
                        fontFamily: "'DM Mono', monospace",
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => {
                  const n = [...blogPosts, {
                    id: `new-${Date.now()}`, title: "New Post", date: "Mar 2026", tag: "Topic",
                    preview: "Preview text...", featured: false,
                    detail: { tagline: "Tagline...", body: "Write your post here...", links: [] },
                  }];
                  setBlogPosts(n); setEditIdx(n.length - 1);
                }} style={{
                  marginTop: 20, padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                  background: ACCENT, color: "white", border: "none", fontSize: 13,
                  fontFamily: "'DM Mono', monospace",
                }}>+ Add Post</button>
              </div>
            )}

            {/* BLOG POST EDIT FORM */}
            {cmsTab === "posts" && editIdx !== null && blogPosts[editIdx] && (() => {
              const p = blogPosts[editIdx];
              const update = (field, val) => {
                const n = [...blogPosts]; n[editIdx] = { ...n[editIdx], [field]: val }; setBlogPosts(n);
              };
              const updateDetail = (field, val) => {
                const n = [...blogPosts]; n[editIdx] = { ...n[editIdx], detail: { ...n[editIdx].detail, [field]: val } }; setBlogPosts(n);
              };
              const inputStyle = {
                width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${DARK}15`,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: LIGHT, outline: "none",
              };
              const labelStyle = {
                fontFamily: "'DM Mono', monospace", fontSize: 11, color: ACCENT,
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, display: "block",
              };
              return (
                <div style={{ padding: "24px 0", maxWidth: 640 }}>
                  <button onClick={() => setEditIdx(null)} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 12, color: ACCENT,
                    background: "none", border: "none", cursor: "pointer", marginBottom: 20,
                  }}>← Back to list</button>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, marginBottom: 24 }}>
                    Edit: {p.title}
                  </h3>
                  {[
                    ["Title", "title", false], ["Tag", "tag", false], ["Date", "date", false],
                    ["Preview", "preview", true],
                  ].map(([label, field, isTextarea]) => (
                    <div key={field} style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{label}</label>
                      {isTextarea ? (
                        <textarea value={p[field]} onChange={e => update(field, e.target.value)}
                          rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                      ) : (
                        <input value={p[field]} onChange={e => update(field, e.target.value)} style={inputStyle} />
                      )}
                    </div>
                  ))}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="checkbox" checked={p.featured || false} onChange={e => update("featured", e.target.checked)} />
                      Featured (Published Paper)
                    </label>
                  </div>
                  <div style={{ borderTop: `1px solid ${DARK}08`, paddingTop: 20, marginTop: 20 }}>
                    <h4 style={{ ...labelStyle, fontSize: 12, marginBottom: 16 }}>Detail Page</h4>
                    {[
                      ["Tagline", "tagline", false], ["Full Content", "body", true],
                    ].map(([label, field, isTextarea]) => (
                      <div key={field} style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>{label}</label>
                        {isTextarea ? (
                          <textarea value={p.detail[field] || ""} onChange={e => updateDetail(field, e.target.value)}
                            rows={8} style={{ ...inputStyle, resize: "vertical" }} />
                        ) : (
                          <input value={p.detail[field] || ""} onChange={e => updateDetail(field, e.target.value)} style={inputStyle} />
                        )}
                      </div>
                    ))}
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Venue (optional)</label>
                      <input value={p.detail.venue || ""} onChange={e => updateDetail("venue", e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Funded by (optional)</label>
                      <input value={p.detail.funded || ""} onChange={e => updateDetail("funded", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <button onClick={() => { saveData(projects, blogPosts); setEditIdx(null); }} style={{
                    marginTop: 12, padding: "12px 28px", borderRadius: 8, cursor: "pointer",
                    background: ACCENT, color: "white", border: "none", fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                  }}>Save & Close</button>
                </div>
              );
            })()}
          </div>
          </>)}
        </div>
      )}
    </div>
  );
}
