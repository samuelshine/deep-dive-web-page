import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  Sparkles,
  ChevronUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Heart,
  Star,
} from 'lucide-react';
import './App.css';

/* ─────────────── Animation Variants ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────── App ─────────────── */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <Mission />
      <NewVisitorCTA />
      <PhotoGrid />
      <WhatHappens />
      <ParentInfo />
      <FinalCTA />
      <Footer />

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-brand-600 text-white shadow-lg flex items-center justify-center hover:bg-brand-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── Navbar ─────────────── */

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Visit', href: '#visit' },
  { label: 'What Happens', href: '#what-happens' },
  { label: 'For Parents', href: '#parents' },
];

function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            {scrolled ? (
              <span className="text-2xl font-black tracking-tight text-brand-600" style={{ fontFamily: 'var(--font-heading)' }}>
                DEEP DIVE
              </span>
            ) : (
              <span className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                DEEP DIVE
              </span>
            )}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#visit"
              className="btn-pill btn-pill-primary text-sm px-6 py-3"
            >
              Plan Your Visit
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-800 font-semibold text-lg hover:text-brand-600 transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-pill btn-pill-primary block text-center mt-4"
              >
                Plan Your Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────── Hero ─────────────── */

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Photo */}
      <div className="absolute inset-0">
        <img
          src="/kids-smiling.png"
          alt="Deep Dive worship event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.img
          variants={fadeUp}
          custom={0}
          src="/deep-dive-logo.png"
          alt="Deep Dive Saturday Bible Club"
          className="h-24 sm:h-32 md:h-40 lg:h-48 mx-auto mb-8 drop-shadow-2xl brightness-0 invert object-contain"
        />
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-lg"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Deep Dive is the children&apos;s ministry for kids from ages 4–14.
        </motion.h1>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a href="#visit" className="btn-pill btn-pill-primary text-lg px-8 py-4">
            Plan Your Visit <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#about" className="btn-pill btn-pill-secondary text-lg px-8 py-4">
            Learn More
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Mission ─────────────── */

function Mission() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            We&apos;re dedicated to partnering with parents to lead children to become fully devoted followers of{' '}
            <span className="text-brand-600">Christ.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto"
          >
            Through age-specific lessons, activities, and small groups, children from ages 4–14
            learn biblical truths and real-life applications they can carry with them every single week at Deep Dive.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── New Visitor CTA ─────────────── */

function NewVisitorCTA() {
  return (
    <section id="visit" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/kids-listening.png"
          alt="Kids in Bible class"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 to-brand-800/90" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        variants={stagger}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
      >
        {/* Icon */}
        <motion.div
          variants={fadeUp}
          className="w-20 h-20 rounded-full bg-accent-teal/20 flex items-center justify-center mx-auto mb-8"
        >
          <Star className="w-10 h-10 text-accent-yellow" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-5xl font-black text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          New to Deep Dive?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed"
        >
          We&apos;d love to have your family join us! Save time when you arrive by pre-registering your kids for their first visit.
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#" className="btn-pill bg-white text-brand-600 font-bold px-8 py-4 text-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-xl">
            Register Your Kids
          </a>
          <a href="#schedule" className="btn-pill btn-pill-secondary px-8 py-4 text-lg flex items-center gap-2">
            Find Times & Location <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Photo Grid ─────────────── */

function PhotoGrid() {
  const photos = [
    { src: '/stage-worship.png', alt: 'Stage worship event' },
    { src: '/class.png', alt: 'Bible class in session' },
    { src: '/kids-fellowship.png', alt: 'Kids fellowship time' },
    { src: '/kids-having-games.png', alt: 'Kids playing games' },
    { src: '/puppet-show.png', alt: 'Puppet show performance' },
    { src: '/kids-together.png', alt: 'Kids together at Deep Dive' },
  ];

  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {photos.map(({ src, alt }, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative aspect-[4/3] overflow-hidden group"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── What Happens ─────────────── */

const features = [
  {
    icon: BookOpen,
    color: 'bg-brand-600',
    title: 'Biblical Teachings Brought to Life',
    desc: 'The Bible is the most amazing book ever written! We bring its stories to life through age-appropriate activities, drama, and discussions that keep kids engaged. Every child will love God\'s Word and understand how to apply it to their life.',
  },
  {
    icon: Users,
    color: 'bg-accent-coral',
    title: 'Meaningful Relationships',
    desc: 'When your child attends each Saturday, they build relationships with small group leaders and other kids. These friendships provide support and confidence, helping your child grow in their faith journey.',
  },
  {
    icon: Sparkles,
    color: 'bg-accent-yellow',
    title: 'Fun!',
    desc: 'When kids have fun at church, they can\'t wait to come back! They\'ll have a blast each week as they learn about who God is through games, activities, worship, puppet shows, and creative teaching.',
  },
];

function WhatHappens() {
  return (
    <section id="what-happens" className="bg-surface-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-16"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What Happens in <span className="text-brand-600">Deep Dive?</span>
          </motion.h2>

          <div className="space-y-20">
            {features.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i + 1}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={5} className="mt-16">
            <a href="#parents" className="btn-pill btn-pill-primary text-lg px-10 py-4">
              What to Expect <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Parent Info ─────────────── */

const safetyItems = [
  {
    icon: ShieldCheck,
    title: 'Background-Checked Leaders',
    desc: 'Every team member undergoes thorough screening and training before serving with children.',
  },
  {
    icon: Clock,
    title: 'Every Saturday, 3:00 – 5:30 PM',
    desc: 'Drop-off starts at 2:45 PM. Our program runs every Saturday afternoon with activities, teaching, and fun.',
  },
  {
    icon: Heart,
    title: 'First-Aid Trained',
    desc: 'Team members are equipped with first-aid training and emergency protocols for your peace of mind.',
  },
  {
    icon: MapPin,
    title: 'City Harvest AG Church, Chennai',
    desc: 'A safe, welcoming environment with open-plan rooms and visible spaces. Contact us for directions.',
  },
];

function ParentInfo() {
  return (
    <section id="parents" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              For <span className="text-brand-600">Parents</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Your child&apos;s safety and growth is our top priority. Here&apos;s what you need to know.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {safetyItems.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i + 1}
                className="flex gap-5 p-6 rounded-2xl bg-surface-light hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-600/10 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-brand-600" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-gray-900 mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Final CTA ─────────────── */

function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/speaking-to-kids.png"
          alt="Teaching children"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 to-black/80" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        variants={stagger}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          We&apos;d love to see <span className="text-accent-yellow">you!</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed"
        >
          Whether it&apos;s your first time or you&apos;re coming back — there&apos;s
          always a place for your family at Deep Dive. Come as you are!
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#visit" className="btn-pill bg-white text-brand-600 font-bold px-10 py-4 text-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-xl">
            Plan Your Visit <ChevronRight className="w-5 h-5 inline-block ml-1" />
          </a>
          <a href="mailto:hello@deepdivekids.org" className="btn-pill btn-pill-secondary px-10 py-4 text-lg">
            <Mail className="w-5 h-5" /> Contact Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */

function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/deep-dive-logo.png" alt="Deep Dive" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A vibrant children&apos;s ministry at City Harvest AG Church. We exist
              to help kids Love God, Grow Together, and Reach the World.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Plan Your Visit', href: '#visit' },
                { label: 'What Happens', href: '#what-happens' },
                { label: 'For Parents', href: '#parents' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span>City Harvest AG Church, Chennai</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <span>Contact church office</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <span>hello@deepdivekids.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-400 shrink-0" />
                <span>Saturdays 3:00 – 5:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Deep Dive Saturday Bible Club. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with <Heart className="w-3 h-3 inline text-accent-coral" /> for the little ones.
          </p>
        </div>
      </div>
    </footer>
  );
}
