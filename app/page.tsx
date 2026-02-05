'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="antialiased selection:bg-gold-500/30 selection:text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {/* Dynamic gradient that follows mouse */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
        />
        {/* Static ambient glows */}
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
        {/* Animated grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-midnight-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20'
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-11 h-11">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500 group-hover:scale-110" />
                <div className="relative z-10 w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20">
                  <i className="fa-solid fa-dove text-midnight-950 text-lg" />
                </div>
              </div>
              <span className="font-serif font-bold text-xl tracking-[0.2em] text-white">
                STREAMS<span className="text-gold-400">JOY</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { label: 'EXPERIENCE', href: '#features' },
                { label: 'TESTIMONIES', href: '#testimonies' },
                { label: 'GIVING', href: '#giving' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-5 py-2 text-[13px] font-semibold tracking-widest text-gray-400 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100" />
                </Link>
              ))}
              <Link
                href="#download"
                className="ml-4 relative overflow-hidden px-7 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-midnight-950 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <i className="fa-solid fa-arrow-down text-xs" />
                  GET THE APP
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className={`w-6 flex flex-col gap-1.5 transition-all ${isMobileMenuOpen ? 'gap-0' : ''}`}>
                <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
                <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-midnight-950/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-6 py-8 flex flex-col gap-4">
            {[
              { label: 'EXPERIENCE', href: '#features' },
              { label: 'TESTIMONIES', href: '#testimonies' },
              { label: 'GIVING', href: '#giving' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold tracking-widest text-gray-400 hover:text-white transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#download"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-7 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-midnight-950 rounded-full font-bold text-center"
            >
              GET THE APP
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Hero decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 border border-gold-500/10 rounded-full animate-spin-slow opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-white/5 rounded-full animate-spin-slow animation-delay-2000" style={{ animationDirection: 'reverse' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Hero Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 animate-float">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                </div>
                <span className="text-xs font-bold tracking-[0.25em] text-gold-300 uppercase">
                  NSPPD Fire Prayers • Live Daily 7AM
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[0.95] tracking-tight">
                  <span className="block text-white/90">WHAT GOD</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">CANNOT DO</span>
                  <span className="block text-gradient-gold italic mt-2">DOES NOT EXIST.</span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Your digital altar for the miraculous. Join millions in the Fire Prayers,
                build your spiritual streaks, and carry the atmosphere of heaven in your pocket.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="group relative px-8 py-4 bg-white text-midnight-950 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3">
                    <i className="fa-brands fa-apple text-2xl" />
                    <div className="text-left">
                      <div className="text-[10px] font-medium opacity-80">Download on the</div>
                      <div className="text-sm font-bold -mt-0.5">App Store</div>
                    </div>
                  </span>
                </button>
                <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center gap-3">
                    <i className="fa-brands fa-google-play text-2xl text-gold-400" />
                    <div className="text-left">
                      <div className="text-[10px] font-medium opacity-80">Get it on</div>
                      <div className="text-sm font-bold -mt-0.5">Google Play</div>
                    </div>
                  </span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-5 justify-center lg:justify-start pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full border-2 border-midnight-900 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white text-xs shadow-lg"
                    >
                      <i className="fa-solid fa-user opacity-60" />
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full border-2 border-midnight-900 bg-gradient-to-br from-gold-500 to-gold-600 text-midnight-900 flex items-center justify-center font-bold text-xs shadow-lg shadow-gold-500/30">
                    +2M
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-white">2 Million+ Prayer Warriors</p>
                  <p className="text-gold-400/80 text-xs">Connected Worldwide</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative flex items-center justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-gold-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Bento Grid */}
      <FeaturesSection />

      {/* The Testimony Wall (Marquee) */}
      <TestimonyWall />

      {/* App Preview Section */}
      <AppPreviewSection />

      {/* CTA Final */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Phone Mockup Component
function PhoneMockup() {
  return (
    <div className="relative">
      {/* Glow behind phone */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/20 via-transparent to-purple-500/10 blur-3xl scale-150" />

      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] border border-gold-500/20 rounded-full animate-spin-slow" />
        <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
      </div>

      {/* Phone */}
      <div className="relative w-[280px] sm:w-[320px] phone-mockup bg-midnight-800 rounded-[2.5rem] border-[6px] border-gray-800/80 overflow-hidden h-[560px] sm:h-[640px] shadow-2xl shadow-black/50">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-800" />
          <div className="w-3 h-3 rounded-full bg-gray-800 ring-1 ring-gray-700" />
        </div>

        {/* Screen Content */}
        <div className="h-full w-full bg-gradient-to-b from-midnight-900 to-midnight-950 flex flex-col text-white overflow-hidden relative">
          {/* App Header */}
          <div className="p-5 pt-12">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gold-500 text-[10px] font-bold tracking-[0.2em] uppercase">Good Morning</p>
                <h3 className="font-serif text-lg mt-0.5">Believer</h3>
              </div>
              <div className="flex gap-2">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center ring-1 ring-white/10">
                  <i className="fa-solid fa-bell text-xs text-gray-400" />
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                  <i className="fa-solid fa-user text-xs text-midnight-950" />
                </div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="mx-4 p-5 rounded-2xl bg-gradient-to-br from-gold-500 via-gold-500 to-gold-600 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-10">
              <i className="fa-solid fa-fire text-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-fire text-white" />
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Current Streak</span>
              </div>
              <div className="text-4xl font-bold text-white font-serif">
                12 <span className="text-base font-sans font-normal opacity-80">Days</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[80%] rounded-full" />
              </div>
              <p className="text-[10px] mt-2 text-white/90 italic">
                "Fire doesn't require permission to burn."
              </p>
            </div>
          </div>

          {/* Live Session */}
          <div className="mx-4 mt-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-red-400 tracking-wider">NSPPD LIVE NOW</p>
              <p className="text-[10px] text-gray-400 truncate">Oh Lord, Show Me Mercy</p>
            </div>
            <button className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition-colors">
              JOIN
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2.5 p-4 mt-1">
            {[
              { icon: 'fa-book-bible', label: 'Bible', sub: 'KJV, NIV & AMP', color: 'blue' },
              { icon: 'fa-list-check', label: 'My Prayers', sub: 'Track Answers', color: 'green' },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className={`w-8 h-8 rounded-xl bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${item.icon} text-xs`} />
                </div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-[10px] text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="mt-auto bg-black/50 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-between items-center text-gray-500">
            <i className="fa-solid fa-house text-gold-500 text-lg" />
            <i className="fa-solid fa-compass text-lg hover:text-gray-300 cursor-pointer transition-colors" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-midnight-950 -mt-8 shadow-xl shadow-gold-500/30 hover:scale-110 transition-transform cursor-pointer">
              <i className="fa-solid fa-plus text-lg" />
            </div>
            <i className="fa-solid fa-book-open text-lg hover:text-gray-300 cursor-pointer transition-colors" />
            <i className="fa-solid fa-user text-lg hover:text-gray-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: '2M+', label: 'Active Users', icon: 'fa-users' },
    { value: '150+', label: 'Countries', icon: 'fa-globe' },
    { value: '500K+', label: 'Daily Prayers', icon: 'fa-hands-praying' },
    { value: '4.9', label: 'App Rating', icon: 'fa-star' },
  ]

  return (
    <section className="relative z-10 py-16 border-y border-white/5 bg-midnight-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-500 mb-4 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                <i className={`fa-solid ${stat.icon} text-xl`} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 font-serif">{stat.value}</div>
              <div className="text-sm text-gray-500 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section Component
function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <i className="fa-solid fa-sparkles text-gold-400 text-xs" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Equip Your <span className="text-gradient-gold italic">Spirit Man</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            We didn't just build an app—we built a digital prayer room designed to minimize distraction and maximize your connection with the divine.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Feature 1 - Large */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 hover:border-gold-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center text-gold-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-fire" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Prayer Fire Streaks</h3>
              <p className="text-gray-400 mb-8 max-w-md">
                Consistency is the key to spiritual growth. Visualize your commitment with daily streaks. Don't break the chain of fire.
              </p>

              {/* Streak Visualization */}
              <div className="flex gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div
                    key={day + idx}
                    className={`flex-1 h-20 ${
                      idx < 5
                        ? 'bg-gradient-to-b from-gold-500/30 to-gold-500/5 border-gold-500/40'
                        : 'bg-white/5 border-white/5 opacity-50'
                    } border rounded-xl flex flex-col items-center justify-center gap-1 transition-all hover:scale-105`}
                  >
                    <span className={`text-xs font-bold ${idx < 5 ? 'text-gold-300' : 'text-gray-600'}`}>{day}</span>
                    {idx < 5 && <i className="fa-solid fa-fire text-gold-500" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-book-bible" />
              </div>
              <h3 className="text-xl font-bold mb-3">In-App Bible</h3>
              <p className="text-gray-400 text-sm">
                Read scriptures without leaving the stream. Highlight verses, take notes, and dive deep into the Word.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 hover:border-green-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-clipboard-check" />
              </div>
              <h3 className="text-xl font-bold mb-3">My Evidence</h3>
              <p className="text-gray-400 text-sm">
                Document your prayer points and tick them off as they become testimonies. Build your altar of remembrance.
              </p>
            </div>
          </div>

          {/* Feature 4 - Wide */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 hover:border-purple-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-pen-to-square" />
                </div>
                <h3 className="text-xl font-bold mb-3">Rhema Notes</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Capture divine revelations instantly. Your notes are synced to the cloud, searchable, and never lost.
                </p>
              </div>
              <div className="w-full sm:w-64 bg-midnight-800/80 rounded-xl p-4 border border-white/5 text-xs font-mono text-gray-400 rotate-0 sm:rotate-2 group-hover:rotate-0 transition-transform">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <p className="text-gold-400 mb-2 text-xs">Topic: The Power of Mercy</p>
                <p className="text-gray-500 leading-relaxed">
                  The mercy of God speaks over judgment. When mercy speaks, protocols are suspended...
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-2 border-dashed border-white/10 p-8 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-500 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all">
              <i className="fa-solid fa-download text-2xl text-gray-400 group-hover:text-gold-400 transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">Download Audio</h3>
            <p className="text-xs text-gray-500">Listen offline, anywhere, anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimony Wall Component
function TestimonyWall() {
  const testimonies = [
    "WHAT GOD CANNOT DO DOES NOT EXIST",
    "MY EVIDENCE IS HERE",
    "IT IS DONE",
    "CONGRATULATIONS",
    "EL-ROI HAS SEEN ME",
    "FIRE ON THE ALTAR"
  ]

  return (
    <section id="testimonies" className="py-16 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />

      <div className="flex animate-marquee">
        {[...Array(2)].map((_, setIdx) => (
          <div key={setIdx} className="flex gap-12 px-6 whitespace-nowrap">
            {testimonies.map((text, idx) => (
              <div key={`${setIdx}-${idx}`} className="flex items-center gap-12">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-midnight-900/90">{text}</span>
                <i className="fa-solid fa-cross text-2xl text-white/40" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
// App Preview Section
function AppPreviewSection() {
  return (
    <section id="giving" className="relative z-10 overflow-hidden">
    </section>
  )
}

// CTA Section Component
function CTASection() {
  return (
    <section id="download" className="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-gold-500/30 via-gold-500/10 to-transparent blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-500/10 rounded-full animate-spin-slow" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="inline-block mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-500 blur-2xl opacity-30 animate-pulse" />
            <i className="fa-solid fa-dove text-6xl text-white relative z-10" />
          </div>
        </div>

        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
          Don't Miss The <br/>
          <span className="text-gradient-gold">Next Move.</span>
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          The atmosphere of miracles is waiting for you. Download the Streams of Joy app now and set your altar on fire.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button className="group px-10 py-5 bg-white text-midnight-950 font-bold rounded-2xl hover:bg-gold-400 transition-all hover:scale-105 shadow-2xl shadow-white/20">
            <span className="flex items-center justify-center gap-3">
              <i className="fa-brands fa-apple text-2xl" />
              Download for iOS
            </span>
          </button>
          <button className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all">
            <span className="flex items-center justify-center gap-3">
              <i className="fa-brands fa-android text-2xl text-green-400" />
              Download for Android
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="relative z-10 bg-midnight-950 border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-dove text-midnight-950" />
              </div>
              <span className="font-serif font-bold text-xl tracking-[0.2em] text-white">
                STREAMS<span className="text-gold-400">JOY</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-6">
              Your digital altar for the miraculous. Join millions around the world in the 7AM Fire Prayers.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-500/20 hover:text-gold-400 transition-all"
                >
                  <i className={`fa-brands fa-${social}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#features" className="hover:text-gold-400 transition-colors">Features</Link></li>
              <li><Link href="#testimonies" className="hover:text-gold-400 transition-colors">Testimonies</Link></li>
              <li><Link href="#giving" className="hover:text-gold-400 transition-colors">Partner With Us</Link></li>
              <li><Link href="#download" className="hover:text-gold-400 transition-colors">Download</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/user/request-deletion" className="hover:text-gold-400 transition-colors">Data Deletion</Link></li>
              <li><a href="mailto:support@streamsofjoy.com" className="hover:text-gold-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Consonant Technologies Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <i className="fa-solid fa-heart text-red-500" /> for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}
