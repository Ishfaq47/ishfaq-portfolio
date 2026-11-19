import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Code2,
  Mail,
  Menu,
  Play,
  Send,
  Sparkles,
  Workflow,
  X,
  Zap,
  Video,
  Layers3,
  Check,
  Copy,
  ChevronUp,
  Cpu,
  Compass,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import heroPortrait from './assets/hero-portrait.png';
import './style.css';

/* ---------- SVG Brand Icons (Zero-dependency & Rolldown compatible) ---------- */
function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ---------- Data Definitions ---------- */
const SKILLS = [
  {
    icon: Code2,
    name: 'Vibe Coding',
    desc: 'Translating concepts into functional, high-performance web applications with AI coding partners and rapid iteration cycles.'
  },
  {
    icon: Video,
    name: 'Video Editing',
    desc: 'Producing retention-focused short-form content with CapCut, kinetic pacing, dynamic captions, and visual storytelling.'
  },
  {
    icon: Workflow,
    name: 'AI Automation',
    desc: 'Architecting intelligent pipelines with Make.com, Apify, and custom webhooks to replace repetitive manual operations.'
  },
  {
    icon: BrainCircuit,
    name: 'Prompt Engineering',
    desc: 'Designing structured system instructions, role contexts, and deterministic agent prompts that reliably achieve business goals.'
  },
  {
    icon: Bot,
    name: 'Agentic Workflows',
    desc: 'Deploying autonomous AI agents capable of deep market research, multimodal synthesis, and multi-step task execution.'
  },
  {
    icon: Layers3,
    name: 'Content Systems',
    desc: 'Building end-to-end engines for automated content discovery, semantic deduplication, categorization, and omnichannel distribution.'
  }
];

const PROJECTS = [
  {
    n: '01',
    type: 'AI AUTOMATION',
    title: 'Content Discovery System',
    desc: 'An automated workflow system that monitors high-performing content across platforms, removes duplicates using semantic AI filtering, and organizes ideas for multi-format publishing.',
    tags: ['Apify', 'Make.com', 'AI Agents', 'Semantic Search'],
    icon: Workflow,
    highlights: [
      'Automated extraction of high-engagement video hooks and topic patterns across creators',
      'AI-powered semantic clustering that groups related topics and discards redundant posts',
      'Direct synchronization into structured Airtable and Notion production kanbans'
    ]
  },
  {
    n: '02',
    type: 'VIBE CODING',
    title: 'AI-Powered Web Apps',
    desc: 'Rapidly conceptualizing and building responsive web tools with AI-assisted software engineering, robust component systems, and fluid micro-interactions.',
    tags: ['React', 'Vite', 'Framer Motion', 'UI/UX Design'],
    icon: Code2,
    highlights: [
      'From natural language concept to fully interactive production build in record time',
      'Clean reactive state architectures with optimized rendering and glassmorphic aesthetics',
      'Accessible, mobile-first design with smooth tactile micro-animations'
    ]
  },
  {
    n: '03',
    type: 'CREATIVE PRODUCTION',
    title: 'Short-form Video Studio',
    desc: 'A dedicated video production framework optimized for TikTok, YouTube Shorts, and Instagram Reels, focusing on first-3-second retention hooks and visual clarity.',
    tags: ['CapCut', 'Storyboarding', 'Retention Editing', 'Audio Design'],
    icon: Play,
    highlights: [
      'Strategic visual hook architectures designed to stop passive scrolling',
      'Dynamic keyframe motion, text overlays, and synchronized SFX pacing',
      'Systematized editing templates for consistent, high-volume creative turnaround'
    ]
  }
];

const TOOLS = ['Make.com', 'Apify', 'CapCut', 'React', 'Vite', 'Framer Motion', 'AI Agents', 'Prompting', 'REST APIs', 'Node.js'];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Explore',
    desc: 'Analyze the problem space, dissect user friction, and map out available tools and AI architectures.'
  },
  {
    num: '02',
    title: 'Experiment',
    desc: 'Test candidate prompts, tool integrations, and API interactions in rapid prototyping sandboxes.'
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Engineer the end-to-end workflow into a dependable, production-grade system with resilient safeguards.'
  },
  {
    num: '04',
    title: 'Refine',
    desc: 'Evaluate output quality against real-world scenarios, optimize latency, and systematically iterate.'
  }
];

/* ---------- Interactive Spotlight Card (GPU-accelerated, zero re-renders) ---------- */
function SpotlightCard({ children, className = '', onClick = null, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`glass-card spotlight-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---------- Scroll Trigger Reveal Component ---------- */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

function Reveal({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Main Application Component ---------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Progress
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const shouldReduceMotion = useReducedMotion();

  // Scroll Spy and Back to Top
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTop(currentY > 450);

      const sections = ['home', 'about', 'skills', 'projects', 'process', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-locked');
    } else {
      document.body.classList.remove('menu-locked');
    }
  }, [menuOpen]);

  // Copy email handler
  const handleCopyEmail = useCallback((e) => {
    if (e) e.preventDefault();
    const email = 'aleeishfaq8@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="site-shell">
      {/* Top Scroll Reading Progress */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Background Ambient Violet Lights & Grid (Hardware-accelerated) */}
      <div className="ambient-lights" aria-hidden="true">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-secondary" />
        <div className="ambient-orb orb-tertiary" />
      </div>
      <div className="bg-grid" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Sticky Glass Navigation Bar */}
      <header className="topbar-wrapper">
        <div className="topbar">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-badge">
              M<span>i</span>
            </span>
            <div className="brand-text">
              <span className="brand-name">Muhammad Ishfaq</span>
              <span className="brand-title">AI & Creative Specialist</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            {navItems.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="nav-link-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="topbar-actions">
            <a className="top-cta" href="mailto:aleeishfaq8@gmail.com">
              <Mail size={15} />
              <span>Let's Talk</span>
            </a>
            <button
              className="menu-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-nav-links">
                {navItems.map(({ label, id }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`mobile-nav-item ${activeSection === id ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <span>{label}</span>
                    <ArrowRight size={16} />
                  </a>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <a
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  href="mailto:aleeishfaq8@gmail.com"
                  onClick={closeMenu}
                >
                  <Mail size={16} />
                  <span>Start a Conversation</span>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                  onClick={handleCopyEmail}
                >
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  <span>{copied ? 'Email Copied!' : 'Copy aleeishfaq8@gmail.com'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {/* ==================== HERO SECTION ==================== */}
        <section className="hero-section section-wrap" id="home">
          <div className="hero-grid">
            {/* Left Column: Copy & CTAs */}
            <div className="hero-copy">
              <motion.div
                className="eyebrow-pill"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="status-indicator">
                  <span className="status-indicator-ping" />
                </span>
                <span>AI AUTOMATION ENGINEER</span>
                <Sparkles size={13} />
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 }}
              >
                I BUILD SMARTER<br />
                SYSTEMS WITH <span className="gradient-text">AI.</span>
              </motion.h1>

              <motion.p
                className="hero-lead"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 }}
              >
                AI Automation Engineer <span>&</span> Creative Digital Specialist.
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45 }}
              >
                Turning ideas into intelligent systems, creative experiences, and automated workflows.
                Specialized in vibe coding, video creation, and agentic workflows that compound productivity.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <a className="btn btn-primary" href="#projects">
                  <span>Explore My Work</span>
                  <ArrowRight size={17} />
                </a>
                <a className="btn btn-secondary" href="#contact">
                  <span>Let's Connect</span>
                  <Send size={15} />
                </a>
                <button
                  type="button"
                  className="btn btn-secondary btn-copy-email"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </motion.div>

              {/* Quick Skills Pill Strip */}
              <motion.div
                className="quick-skills-strip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {[
                  { icon: Code2, label: 'Vibe Coding' },
                  { icon: Video, label: 'Video Editing' },
                  { icon: Workflow, label: 'AI Automation' },
                  { icon: BrainCircuit, label: 'Prompt Engineering' },
                  { icon: Zap, label: 'Content Systems' }
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="quick-skill-tag">
                    <Icon size={14} />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Hero Portrait Integration */}
            <motion.div
              className="hero-visual-wrapper"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Layered Lighting Halo & Ambient Tech Orbits */}
              <div className="portrait-aura-glow" />
              <div className="portrait-ring-orbit orbit-inner" />
              <div className="portrait-ring-orbit orbit-outer" />

              {/* Seamless Portrait Container */}
              <div className="portrait-container">
                <img
                  className="hero-portrait-img"
                  src={heroPortrait}
                  alt="Muhammad Ishfaq — AI Automation Engineer & Creative Digital Specialist"
                  width="716"
                  height="1004"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Interactive Glass Chips */}
              <div className="floating-badge badge-top">
                <span className="badge-icon">
                  <Bot size={18} />
                </span>
                <div className="badge-text">
                  <span className="badge-title">AI-Powered</span>
                  <span className="badge-sub">Intelligent Workflows</span>
                </div>
              </div>

              <div className="floating-badge badge-bottom">
                <span className="badge-icon">
                  <div className="equalizer-bars">
                    <span /><span /><span /><span />
                  </div>
                </span>
                <div className="badge-text">
                  <span className="badge-title">Ideas → Systems</span>
                  <span className="badge-sub">Building What's Next</span>
                </div>
              </div>

              {/* Cursive Name Signature */}
              <div className="signature-watermark">Muhammad Ishfaq</div>
            </motion.div>
          </div>

          {/* Scroll Cue */}
          <Reveal delay={0.75}>
            <a className="scroll-cue" href="#about">
              <span className="scroll-line" />
              <ArrowDown size={14} color="#a855f7" />
              <span>Scroll to explore</span>
              <span className="scroll-line scroll-line-reverse" />
            </a>
          </Reveal>
        </section>

        {/* ==================== 01 / ABOUT ME SECTION ==================== */}
        <section className="section-wrap section-padding" id="about">
          <Reveal>
            <div className="section-header">
              <span className="section-kicker">01 / ABOUT ME</span>
              <h2 className="section-title">
                Curiosity into <span className="gradient-text">capability.</span>
              </h2>
              <p className="section-subtitle">
                A relentless builder exploring the frontiers of artificial intelligence and creative digital media.
              </p>
            </div>
          </Reveal>

          <div className="about-grid">
            {/* Left: Professional Portrait with Glass Frame */}
            <Reveal className="about-photo-wrapper">
              <div className="about-photo-frame">
                <img
                  src={heroPortrait}
                  alt="Muhammad Ishfaq — AI Automation Engineer & Creative Digital Specialist"
                  loading="lazy"
                  decoding="async"
                  width="716"
                  height="1004"
                />
                <div className="photo-badge">
                  CURIOUS BY NATURE. BUILDER BY CHOICE.
                </div>
              </div>
            </Reveal>

            {/* Right: Narrative Story & Highlights */}
            <Reveal className="about-content" delay={0.15}>
              <p className="body-paragraph">
                I'm <strong>Muhammad Ishfaq</strong> — an AI automation engineer and creative digital specialist driven
                by a passion for modern problem-solving. I bridge the gap between complex AI models and practical,
                high-leverage outcomes that eliminate friction and bring ambitious ideas to life.
              </p>
              <p className="body-paragraph">
                Whether orchestrating autonomous multi-agent pipelines with Apify and Make.com, rapidly authoring
                interactive web interfaces through vibe coding, or editing high-retention short-form videos with CapCut,
                I approach every challenge with curiosity, speed, and precision.
              </p>

              {/* 3 Core Strengths */}
              <div className="about-highlights">
                <div className="highlight-box">
                  <div className="highlight-icon">
                    <Workflow size={17} />
                  </div>
                  <div className="highlight-title">Automation Mindset</div>
                  <div className="highlight-desc">Transforming manual, repetitive toil into self-sustaining autonomous pipelines.</div>
                </div>

                <div className="highlight-box">
                  <div className="highlight-icon">
                    <Play size={17} />
                  </div>
                  <div className="highlight-title">Creative Precision</div>
                  <div className="highlight-desc">Retention-first storytelling with punchy visual hooks, sound design, and clarity.</div>
                </div>

                <div className="highlight-box">
                  <div className="highlight-icon">
                    <Code2 size={17} />
                  </div>
                  <div className="highlight-title">Vibe Coding Velocity</div>
                  <div className="highlight-desc">Moving from napkin sketch to functional web experience in hours, not weeks.</div>
                </div>
              </div>

              <div style={{ marginTop: '10px' }}>
                <a className="btn btn-secondary" href="#skills">
                  <span>Explore My Toolkit</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== 02 / SKILLS & TOOLKIT SECTION ==================== */}
        <section className="section-wrap section-padding" id="skills">
          <Reveal>
            <div className="section-header">
              <span className="section-kicker">02 / MY TOOLKIT</span>
              <h2 className="section-title">
                Skills that turn <span className="gradient-text">ideas into action.</span>
              </h2>
              <p className="section-subtitle">
                A versatile skillset built for the era of artificial intelligence, automated leverage, and modern media.
              </p>
            </div>
          </Reveal>

          {/* 6 Core Skills Grid with Interactive Spotlight */}
          <div className="skills-grid">
            {SKILLS.map(({ icon: Icon, name, desc }, idx) => (
              <Reveal key={name} delay={idx * 0.08}>
                <SpotlightCard className="skill-card">
                  <div>
                    <div className="skill-card-top">
                      <span className="skill-icon-bubble">
                        <Icon size={22} />
                      </span>
                      <span className="skill-index">0{idx + 1}</span>
                    </div>
                    <h3 className="skill-title">{name}</h3>
                    <p className="skill-desc">{desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          {/* Tools & Platforms Strip */}
          <Reveal delay={0.3}>
            <div className="tools-strip-box glass">
              <span className="tools-strip-label">CORE TOOLS & ECOSYSTEM</span>
              <div className="tools-strip-pills">
                {TOOLS.map((tool) => (
                  <span key={tool} className="tool-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ==================== 03 / SELECTED WORK SECTION ==================== */}
        <section className="section-wrap section-padding" id="projects">
          <Reveal>
            <div className="section-header">
              <span className="section-kicker">03 / SELECTED WORK</span>
              <h2 className="section-title">
                Ideas in motion. <span className="gradient-text">Systems in action.</span>
              </h2>
              <p className="section-subtitle">
                A curated showcase of real-world workflows, prototypes, and creative systems. Click any project to inspect its architecture.
              </p>
            </div>
          </Reveal>

          {/* Project List */}
          <div className="projects-list">
            {PROJECTS.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <Reveal key={proj.n} delay={idx * 0.1}>
                  <SpotlightCard
                    className="project-item"
                    onClick={() => setSelectedProject(proj)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${proj.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(proj);
                      }
                    }}
                  >
                    <span className="project-index">{proj.n}</span>
                    <div className="project-details">
                      <span className="project-type-kicker">{proj.type}</span>
                      <h3 className="project-title">{proj.title}</h3>
                      <p className="project-summary">{proj.desc}</p>
                      <div className="project-tags-wrap">
                        {proj.tags.map((t) => (
                          <span key={t} className="tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="project-icon-box">
                      <Icon size={30} />
                    </div>
                    <div className="project-arrow-btn">
                      <ArrowUpRight size={18} />
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ==================== 04 / HOW I THINK (PROCESS) SECTION ==================== */}
        <section className="section-wrap section-padding" id="process">
          <Reveal>
            <div className="section-header">
              <span className="section-kicker">04 / HOW I THINK</span>
              <h2 className="section-title">
                Learn. Build. <span className="gradient-text">Improve. Repeat.</span>
              </h2>
              <p className="section-subtitle">
                My disciplined engineering framework for transforming ambiguous ideas into reliable, scalable results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="process-box glass">
              <div className="process-glow" />
              <div>
                <span className="section-kicker">THE PHILOSOPHY</span>
                <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', margin: '14px 0 18px', color: '#ffffff' }}>
                  Execution beats theory.
                </h3>
                <p className="body-paragraph" style={{ marginBottom: '24px' }}>
                  The most rapid way to master emerging technology is through focused experimentation. I identify the core
                  bottleneck, select the highest-leverage AI tools, ship a functioning system, and systematically eliminate failure modes.
                </p>
                <a className="btn btn-primary" href="#contact">
                  <span>Collaborate With Me</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="process-steps-container">
                {PROCESS_STEPS.map(({ num, title, desc }) => (
                  <div key={num} className="process-step-item">
                    <span className="step-number">{num}</span>
                    <div className="step-info">
                      <h4 className="step-title">{title}</h4>
                      <p className="step-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ==================== 05 / CONTACT SECTION ==================== */}
        <section className="section-wrap section-padding" id="contact">
          <Reveal>
            <div className="contact-card glass">
              <div className="contact-orb-ambient" />
              <span className="section-kicker">05 / GET IN TOUCH</span>
              <h2 className="contact-title">
                Let's build something <span className="gradient-text">intelligent.</span>
              </h2>
              <p className="contact-body">
                Whether you need automated business workflows, AI-assisted software rapid prototyping, or high-converting
                short-form video production — I'm open for collaborations and high-impact projects.
              </p>

              <div className="contact-actions">
                <a
                  className="btn btn-primary"
                  href="mailto:aleeishfaq8@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                >
                  <Send size={16} />
                  <span>Send An Email</span>
                </a>

                <button type="button" className="btn btn-secondary" onClick={handleCopyEmail}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy aleeishfaq8@gmail.com'}</span>
                </button>
              </div>

              <div
                className="contact-email-bar"
                onClick={handleCopyEmail}
                role="button"
                tabIndex={0}
                title="Click to copy email address"
              >
                <Mail size={15} />
                <span>aleeishfaq8@gmail.com</span>
                <Copy size={13} style={{ marginLeft: '4px', opacity: 0.7 }} />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="site-footer">
        <div className="section-wrap">
          <div className="footer-inner">
            <a className="brand" href="#home">
              <span className="brand-badge" style={{ width: '32px', height: '32px', fontSize: '16px' }}>
                M<span>i</span>
              </span>
              <span className="brand-name" style={{ fontSize: '15px' }}>
                Muhammad Ishfaq
              </span>
            </a>

            <span className="footer-tagline">
              Designed with curiosity. Built with intention.
            </span>

            <div className="footer-socials">
              <a
                className="social-icon-link"
                href="mailto:aleeishfaq8@gmail.com"
                aria-label="Send email to Muhammad Ishfaq"
              >
                <Mail size={16} />
              </a>
              <a
                className="social-icon-link"
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                className="social-icon-link"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Muhammad Ishfaq. All rights reserved.</span>
            <span>AI Automation • Vibe Coding • Creative Systems</span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-dialog"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                aria-label="Close project modal"
                onClick={() => setSelectedProject(null)}
              >
                <X size={18} />
              </button>

              <span className="modal-kicker">{selectedProject.type}</span>
              <h3 className="modal-title">{selectedProject.title}</h3>
              <p className="modal-body">{selectedProject.desc}</p>

              <h4 className="modal-section-title">Key Architectural Highlights</h4>
              <div className="modal-highlights-list">
                {selectedProject.highlights.map((item, i) => (
                  <div key={i} className="modal-highlight-row">
                    <CheckCircle2 size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h4 className="modal-section-title">Technologies Used</h4>
              <div className="project-tags-wrap" style={{ marginBottom: '30px' }}>
                {selectedProject.tags.map((t) => (
                  <span key={t} className="tag-pill" style={{ padding: '6px 14px', fontSize: '12px' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  href={`mailto:aleeishfaq8@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(selectedProject.title)}`}
                >
                  <Send size={15} />
                  <span>Discuss This Project</span>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>Close</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Clipboard Toast */}
      <AnimatePresence>
        {copied && (
          <div className="toast-container">
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
            >
              <Check size={16} />
              <span>Email copied to clipboard: aleeishfaq8@gmail.com</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Render root
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
