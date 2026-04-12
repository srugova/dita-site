export const metadata = {
  title: "Dita Data — Data & AI Consulting for Real Humans",
  description:
    "Solo founder or small team drowning in messy data? Dita helps you clean it up, make sense of it, and actually use it. Based in Jakarta.",
};

const BG = "#FFFDF9";
const INK = "#1C1917";
const MUTED = "#78716C";
const ACCENT = "#b6d7a8";
const ACCENT_BG = "#f0f7ed";
const CARD_BORDER = "#E7E5E4";
const DARK_CARD = "#1C1917";

export default function ServicesPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; }

        .services-page {
          background: ${BG};
          color: ${INK};
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        /* NAV */
        .svc-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: ${BG}EE;
          backdrop-filter: blur(16px);
          border-bottom: 1px solid ${CARD_BORDER};
          padding: 0 48px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .svc-nav-logo {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: 22px;
          font-weight: 400;
          color: ${INK};
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .svc-nav-logo span { color: ${ACCENT}; }
        .svc-nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .svc-nav-link {
          font-size: 14px;
          color: ${MUTED};
          text-decoration: none;
          transition: color 0.2s;
        }
        .svc-nav-link:hover { color: ${INK}; }
        .svc-btn-primary {
          background: ${INK};
          color: ${BG};
          border: none;
          border-radius: 100px;
          padding: 10px 22px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.2s;
        }
        .svc-btn-primary:hover { opacity: 0.85; }
        .svc-btn-outline {
          background: transparent;
          color: ${INK};
          border: 1.5px solid ${CARD_BORDER};
          border-radius: 100px;
          padding: 10px 22px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.2s;
        }
        .svc-btn-outline:hover { border-color: ${INK}; }

        /* SECTIONS */
        .svc-section { padding: 96px 48px; }
        .svc-section-sm { padding: 64px 48px; }
        .svc-container { max-width: 1080px; margin: 0 auto; }

        /* HERO */
        .svc-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${ACCENT_BG};
          border: 1px solid ${ACCENT};
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 13px;
          color: ${MUTED};
          margin-bottom: 32px;
        }
        .svc-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${ACCENT};
          flex-shrink: 0;
        }
        .svc-hero-headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: ${INK};
          margin-bottom: 24px;
          max-width: 780px;
        }
        .svc-hero-sub {
          font-size: 17px;
          color: ${MUTED};
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 40px;
        }
        .svc-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* REAL TALK */
        .realtalk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .realtalk-headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: ${INK};
          margin-bottom: 20px;
        }
        .realtalk-body {
          font-size: 15px;
          color: ${MUTED};
          line-height: 1.8;
        }
        .pain-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pain-card {
          background: white;
          border: 1px solid ${CARD_BORDER};
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .pain-card-emoji { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
        .pain-card-title {
          font-size: 14px;
          font-weight: 600;
          color: ${INK};
          margin-bottom: 4px;
        }
        .pain-card-body { font-size: 14px; color: ${MUTED}; line-height: 1.6; }

        /* SERVICES */
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${MUTED};
          margin-bottom: 12px;
        }
        .section-headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: ${INK};
          margin-bottom: 48px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .svc-card {
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid ${CARD_BORDER};
          background: white;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(28,25,23,0.10);
          border-color: ${ACCENT};
        }
        .svc-card-featured {
          background: ${DARK_CARD};
          border-color: ${DARK_CARD};
          color: white;
          transform: scale(1.03);
          box-shadow: 0 20px 60px rgba(28,25,23,0.18);
        }
        .svc-card-featured:hover {
          transform: scale(1.03) translateY(-6px);
          box-shadow: 0 28px 72px rgba(28,25,23,0.28);
          border-color: ${ACCENT};
        }
        .svc-card-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${MUTED};
          background: ${ACCENT_BG};
          border-radius: 100px;
          padding: 4px 12px;
          display: inline-block;
          width: fit-content;
        }
        .svc-card-featured .svc-card-tag {
          background: rgba(182,215,168,0.2);
          color: ${ACCENT};
        }
        .svc-card-name {
          font-family: 'Instrument Serif', serif;
          font-size: 26px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: ${INK};
        }
        .svc-card-featured .svc-card-name { color: white; }
        .svc-card-price {
          font-size: 22px;
          font-weight: 700;
          color: ${INK};
        }
        .svc-card-featured .svc-card-price { color: white; }
        .svc-card-price-sub {
          font-size: 13px;
          font-weight: 400;
          color: ${MUTED};
        }
        .svc-card-featured .svc-card-price-sub { color: rgba(255,255,255,0.5); }
        .svc-card-desc {
          font-size: 14px;
          color: ${MUTED};
          line-height: 1.7;
          flex: 1;
        }
        .svc-card-featured .svc-card-desc { color: rgba(255,255,255,0.65); }
        .svc-card-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .svc-card-features li {
          font-size: 13px;
          color: ${MUTED};
          display: flex;
          gap: 8px;
          align-items: flex-start;
          line-height: 1.5;
        }
        .svc-card-featured .svc-card-features li { color: rgba(255,255,255,0.65); }
        .svc-card-features li::before {
          content: '✓';
          color: ${ACCENT};
          font-weight: 700;
          flex-shrink: 0;
        }
        .svc-card-cta {
          margin-top: 8px;
          padding: 12px 20px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          text-align: center;
          display: block;
          transition: opacity 0.2s;
        }
        .svc-card-cta:hover { opacity: 0.8; }
        .svc-card-cta-light {
          background: ${ACCENT_BG};
          color: ${INK};
          border: 1px solid ${ACCENT};
        }
        .svc-card-cta-dark {
          background: ${ACCENT};
          color: ${INK};
        }

        /* HOW IT WORKS */
        .hiw-bg { background: ${ACCENT_BG}; }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .step-num {
          font-family: 'Instrument Serif', serif;
          font-size: 48px;
          font-weight: 400;
          color: ${ACCENT};
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
        }
        .step-title {
          font-size: 16px;
          font-weight: 600;
          color: ${INK};
          margin-bottom: 8px;
        }
        .step-body { font-size: 14px; color: ${MUTED}; line-height: 1.7; }

        /* HOW WE WORK */
        .hww-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .hww-card {
          background: white;
          border: 1px solid ${CARD_BORDER};
          border-radius: 16px;
          padding: 28px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .hww-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(28,25,23,0.08);
          border-color: ${ACCENT};
        }
        .hww-card-title {
          font-size: 15px;
          font-weight: 600;
          color: ${INK};
          margin-bottom: 8px;
        }
        .hww-card-body { font-size: 14px; color: ${MUTED}; line-height: 1.7; }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
        }
        .avatar-circle {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: ${ACCENT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Instrument Serif', serif;
          font-size: 36px;
          font-weight: 400;
          color: ${INK};
          margin-bottom: 24px;
        }
        .about-name {
          font-family: 'Instrument Serif', serif;
          font-size: 28px;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: ${INK};
          margin-bottom: 6px;
        }
        .about-role { font-size: 14px; color: ${MUTED}; margin-bottom: 24px; }
        .about-bio { font-size: 15px; color: ${MUTED}; line-height: 1.8; }
        .cred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cred-card {
          background: white;
          border: 1px solid ${CARD_BORDER};
          border-radius: 16px;
          padding: 20px;
        }
        .cred-card-icon { font-size: 22px; margin-bottom: 10px; }
        .cred-card-title {
          font-size: 14px;
          font-weight: 600;
          color: ${INK};
          margin-bottom: 4px;
        }
        .cred-card-sub { font-size: 13px; color: ${MUTED}; line-height: 1.5; }

        /* FINAL CTA */
        .final-cta-bg {
          background: ${INK};
          text-align: center;
        }
        .final-cta-headline {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: white;
          margin-bottom: 20px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }
        .final-cta-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .svc-btn-accent {
          background: ${ACCENT};
          color: ${INK};
          border: none;
          border-radius: 100px;
          padding: 14px 32px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.2s;
        }
        .svc-btn-accent:hover { opacity: 0.85; }

        /* FOOTER */
        .svc-footer {
          border-top: 1px solid ${CARD_BORDER};
          padding: 32px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: ${MUTED};
        }
        .svc-footer-contact { display: flex; gap: 24px; }
        .svc-footer a { color: ${MUTED}; text-decoration: none; transition: color 0.2s; }
        .svc-footer a:hover { color: ${INK}; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .svc-nav { padding: 0 20px; }
          .svc-nav-links { display: none; }
          .svc-section { padding: 64px 20px; }
          .svc-section-sm { padding: 48px 20px; }
          .realtalk-grid { grid-template-columns: 1fr; gap: 40px; }
          .services-grid { grid-template-columns: 1fr; }
          .svc-card-featured { transform: none; }
          .steps-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .hww-grid { grid-template-columns: 1fr; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .cred-grid { grid-template-columns: 1fr; }
          .svc-footer { flex-direction: column; gap: 16px; text-align: center; }
          .svc-footer-contact { justify-content: center; flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="services-page">

        {/* NAV */}
        <nav className="svc-nav">
          <a href="/services" className="svc-nav-logo">
            Dita Data<span>.</span>
          </a>
          <div className="svc-nav-links">
            <a href="#services" className="svc-nav-link">Services</a>
            <a href="#how-it-works" className="svc-nav-link">How it works</a>
            <a href="#about" className="svc-nav-link">About</a>
            <a href="#" className="svc-btn-primary">Let&apos;s talk →</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="svc-section">
          <div className="svc-container">
            <div className="svc-pill">
              <span className="svc-pill-dot" />
              Jakarta · Data &amp; AI for real humans
            </div>
            <h1 className="svc-hero-headline">
              Your data is a mess.<br />That&apos;s okay.<br />Let&apos;s fix it together.
            </h1>
            <p className="svc-hero-sub">
              A lean team of senior data operators helping companies turn data into real business outcomes.
              No fluff, no six-figure retainers, no jargon — just the right people solving the right problems.
            </p>
            <div className="svc-btn-row">
              <a href="#" className="svc-btn-primary">Book a free Data Chat →</a>
              <a href="#services" className="svc-btn-outline">See what I offer</a>
            </div>
          </div>
        </section>

        {/* REAL TALK */}
        <section className="svc-section-sm" style={{ background: "white" }}>
          <div className="svc-container">
            <div className="realtalk-grid">
              <div>
                <p className="section-label">Real talk</p>
                <h2 className="realtalk-headline">
                  Most small teams are flying blind with their data.
                </h2>
                <p className="realtalk-body">
                  You&apos;ve got spreadsheets nobody trusts, dashboards nobody checks,
                  and a gut feeling that something important is hiding in there somewhere.
                  You&apos;re right. It is. Let&apos;s find it.
                </p>
              </div>
              <div className="pain-cards">
                <div className="pain-card">
                  <span className="pain-card-emoji">😮‍💨</span>
                  <div>
                    <p className="pain-card-title">&ldquo;Our numbers don&apos;t add up across tools.&rdquo;</p>
                    <p className="pain-card-body">
                      Shopify says one thing, your spreadsheet says another, and nobody knows which to believe.
                    </p>
                  </div>
                </div>
                <div className="pain-card">
                  <span className="pain-card-emoji">📊</span>
                  <div>
                    <p className="pain-card-title">&ldquo;We built a dashboard but no one uses it.&rdquo;</p>
                    <p className="pain-card-body">
                      Dashboards that nobody trusts or understands are just expensive decorations.
                    </p>
                  </div>
                </div>
                <div className="pain-card">
                  <span className="pain-card-emoji">🤷</span>
                  <div>
                    <p className="pain-card-title">&ldquo;I don&apos;t even know what questions to ask.&rdquo;</p>
                    <p className="pain-card-body">
                      That&apos;s the most common starting point. And honestly, it&apos;s a great one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="svc-section">
          <div className="svc-container">
            <p className="section-label">What I offer</p>
            <h2 className="section-headline">Pick your starting point.</h2>
            <div className="services-grid">

              {/* Data Makeover */}
              <div className="svc-card">
                <span className="svc-card-tag">Project</span>
                <p className="svc-card-name">Data Makeover</p>
                <p className="svc-card-price">
                  Start Rp 10jt
                  <span className="svc-card-price-sub"> · scales with complexity</span>
                </p>
                <p className="svc-card-desc">
                  A focused 2–4 week sprint to fix one specific data problem. Clean your
                  pipeline, build the dashboard that actually gets used, set up tracking
                  that makes sense.
                </p>
                <ul className="svc-card-features">
                  <li>Clear scope and deliverables upfront</li>
                  <li>You own everything at the end</li>
                  <li>Async-friendly, no daily stand-ups</li>
                  <li>Written handover so your team can maintain it</li>
                </ul>
                <a href="#" className="svc-card-cta svc-card-cta-light">Start a sprint →</a>
              </div>

              {/* Data Chat — featured */}
              <div className="svc-card svc-card-featured">
                <span className="svc-card-tag">Most popular</span>
                <p className="svc-card-name">Data Chat</p>
                <p className="svc-card-price">
                  Rp 350rb
                  <span className="svc-card-price-sub"> / session · Rp 1jt+ for enterprise · 1x free follow-up included</span>
                </p>
                <p className="svc-card-desc">
                  Not sure where to start? Let&apos;s just talk. You tell me what&apos;s going on,
                  I&apos;ll tell you honestly if and how I can help.
                </p>
                <ul className="svc-card-features">
                  <li>No pitch, no pressure</li>
                  <li>You&apos;ll leave with clarity either way</li>
                  <li>I&apos;ll point you in the right direction</li>
                </ul>
                <a href="#" className="svc-card-cta svc-card-cta-dark">Book a session →</a>
              </div>

              {/* Data Buddy */}
              <div className="svc-card">
                <span className="svc-card-tag">Ongoing</span>
                <p className="svc-card-name">Data Buddy</p>
                <p className="svc-card-price">
                  Rp 3–5jt
                  <span className="svc-card-price-sub"> / month · min 2 months</span>
                </p>
                <p className="svc-card-desc">
                  Think of me as your part-time data lead. I&apos;m in your corner every month —
                  answering questions, reviewing work, and making sure your data doesn&apos;t
                  quietly become a disaster again.
                </p>
                <ul className="svc-card-features">
                  <li>Monthly strategy call</li>
                  <li>Async support via chat</li>
                  <li>Ad hoc analysis and reviews</li>
                </ul>
                <a href="#" className="svc-card-cta svc-card-cta-light">Let&apos;s chat →</a>
              </div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="svc-section hiw-bg">
          <div className="svc-container">
            <p className="section-label">Process</p>
            <h2 className="section-headline">How it works.</h2>
            <div className="steps-grid">
              <div>
                <p className="step-num">01</p>
                <p className="step-title">We talk</p>
                <p className="step-body">
                  Book a free Data Chat. Tell me what&apos;s broken, what you&apos;re trying to do,
                  and what you&apos;ve already tried.
                </p>
              </div>
              <div>
                <p className="step-num">02</p>
                <p className="step-title">I send a plan</p>
                <p className="step-body">
                  If it makes sense to work together, I&apos;ll send a short proposal — scope,
                  timeline, price. No fluff.
                </p>
              </div>
              <div>
                <p className="step-num">03</p>
                <p className="step-title">We fix it</p>
                <p className="step-body">
                  I get to work. You get updates. No radio silence. No surprise pivots.
                  You&apos;re in the loop the whole time.
                </p>
              </div>
              <div>
                <p className="step-num">04</p>
                <p className="step-title">You own it</p>
                <p className="step-body">
                  You get the code, the docs, the walkthrough. Everything is yours.
                  I set it up so your team can actually maintain it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="svc-section" style={{ background: "white" }}>
          <div className="svc-container">
            <p className="section-label">Our approach</p>
            <h2 className="section-headline">How we work.</h2>
            <div className="hww-grid">
              <div className="hww-card">
                <p className="hww-card-title">Senior-only team</p>
                <p className="hww-card-body">No juniors. Every project is handled by experienced data professionals.</p>
              </div>
              <div className="hww-card">
                <p className="hww-card-title">Problem-first approach</p>
                <p className="hww-card-body">We don&apos;t push tools. We design solutions based on your actual business bottlenecks.</p>
              </div>
              <div className="hww-card">
                <p className="hww-card-title">Lean, scalable team</p>
                <p className="hww-card-body">We assemble the right team for your needs — not a bloated structure.</p>
              </div>
              <div className="hww-card">
                <p className="hww-card-title">Built for production</p>
                <p className="hww-card-body">Everything we deliver is designed to be used, maintained, and scaled.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="svc-section">
          <div className="svc-container">
            <div className="about-grid">
              <div>
                <div className="avatar-circle">D</div>
                <p className="about-name">Dita Nurhadiyati</p>
                <p className="about-role">Data Lead · Builder · Jakarta</p>
                <p className="about-bio">
                  Dita Data is a data and AI consultancy focused on building production-ready systems for modern teams.
                  <br /><br />
                  Led by a data leader with 10+ years of experience, we operate with a curated network of senior data specialists,
                  each with 5+ years of hands-on experience across analytics, engineering, and AI.
                  <br /><br />
                  This model allows us to stay lean, move fast, and bring in the right expertise for each problem without compromising quality.
                  <br /><br />
                  From data warehouses to recommendation engines and internal AI tools, we build systems that don&apos;t just exist — they deliver measurable impact.
                </p>
              </div>
              <div className="cred-grid">
                <div className="cred-card">
                  <p className="cred-card-icon">🎓</p>
                  <p className="cred-card-title">Monash University</p>
                  <p className="cred-card-sub">Master of Data Science</p>
                </div>
                <div className="cred-card">
                  <p className="cred-card-icon">🏢</p>
                  <p className="cred-card-title">Gramedia Digital</p>
                  <p className="cred-card-sub">Lead of Product Data &amp; Insights</p>
                </div>
                <div className="cred-card">
                  <p className="cred-card-icon">🧠</p>
                  <p className="cred-card-title">Solutions &amp; Capabilities</p>
                  <p className="cred-card-sub">QueryMind — NL to SQL, privacy-first</p>
                </div>
                <div className="cred-card">
                  <p className="cred-card-icon">📣</p>
                  <p className="cred-card-title">Insights &amp; Thinking</p>
                  <p className="cred-card-sub">@ditalovesdata — data for real people</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="svc-section final-cta-bg">
          <div className="svc-container" style={{ textAlign: "center" }}>
            <h2 className="final-cta-headline">
              Your Monday morning<br />shouldn&apos;t feel like a punishment.
            </h2>
            <p className="final-cta-sub">
              Let&apos;s get your data working for you — not the other way around.
            </p>
            <a href="#" className="svc-btn-accent">Book a free Data Chat →</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="svc-footer" style={{ background: BG }}>
          <a href="/services" className="svc-nav-logo" style={{ fontSize: 18 }}>
            Dita Data<span style={{ color: ACCENT }}>.</span>
          </a>
          <div className="svc-footer-contact">
            <a href="mailto:ditadata@gmail.com">ditadata@gmail.com</a>
            <a href="https://instagram.com/ditalovesdata" target="_blank" rel="noopener noreferrer">@ditalovesdata</a>
            <a href="/">← Back to main site</a>
          </div>
        </footer>

      </div>
    </>
  );
}
