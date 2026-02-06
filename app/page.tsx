'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-cream text-charcoal antialiased selection:bg-ember/20 overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled ? 'py-4 bg-cream/90 backdrop-blur-xl shadow-sm' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link href="/" className="group">
              <span className="font-display text-2xl tracking-tight">
                Streams<span className="italic text-ember">Joy</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              <Link href="#features" className="text-sm tracking-wide hover:text-ember transition-colors">Features</Link>
              <Link href="#devotionals" className="text-sm tracking-wide hover:text-ember transition-colors">Devotionals</Link>
              <Link href="#prayer" className="text-sm tracking-wide hover:text-ember transition-colors">Prayer</Link>
              <Link href="#sermons" className="text-sm tracking-wide hover:text-ember transition-colors">Sermons</Link>
              <a href="https://streamsofjoy.org" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide hover:text-ember transition-colors">- Church Website -</a>
              <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide px-6 py-3 bg-charcoal text-cream rounded-full hover:bg-ember transition-colors">
                Download Free
              </a>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
              <span className={`w-6 h-0.5 bg-charcoal transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-6 h-0.5 bg-charcoal transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>

        <div className={`lg:hidden absolute top-full left-0 w-full bg-cream border-t border-charcoal/10 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display">Features</Link>
            <Link href="#devotionals" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display">Devotionals</Link>
            <Link href="#prayer" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display">Prayer</Link>
            <Link href="#sermons" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display">Sermons</Link>
            <a href="https://streamsofjoy.org" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display">Website</a>
            <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-lg px-8 py-4 bg-charcoal text-cream rounded-full text-center mt-4">Download Free</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4">
            <div className="lg:col-span-8">
              <p className="text-sm tracking-[0.3em] uppercase text-ember mb-8 font-medium">Your Complete Spiritual Companion</p>
              <h1 className="font-display text-[11vw] lg:text-[8vw] leading-[0.85] tracking-tight">
                What God<br />
                <span className="italic text-ember">Cannot</span> Do<br />
                Does Not<br />
                <span className="inline-block border-b-4 border-charcoal pb-2">Exist.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:pl-8">
              <div className="space-y-8">
                <p className="text-lg lg:text-xl leading-relaxed text-charcoal/70">
                  Daily devotionals, live prayer sessions, sermon library, Bible study tools, and more—all in one beautiful app.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-ember rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-ember rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">NSPPD Live Daily at 7AM WAT</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-charcoal text-cream text-center rounded-full text-sm font-medium hover:bg-ember transition-colors">
                    <i className="fa-brands fa-apple mr-2" />iOS
                  </a>
                  <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 border border-charcoal text-center rounded-full text-sm font-medium hover:bg-charcoal hover:text-cream transition-colors">
                    <i className="fa-brands fa-android mr-2" />Android
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: 'fa-book-open', label: 'Daily Devotionals', sub: 'With audio & translations' },
              { icon: 'fa-fire', label: 'Prayer Streaks', sub: 'Track your consistency' },
              { icon: 'fa-podcast', label: 'Sermon Library', sub: 'Offline listening' },
              { icon: 'fa-bible', label: 'Bible Study', sub: 'Multiple versions' },
            ].map((item, idx) => (
              <div key={idx} className="aspect-square bg-charcoal rounded-2xl p-6 flex flex-col justify-between group hover:bg-ember transition-colors duration-300">
                <i className={`fa-solid ${item.icon} text-3xl lg:text-4xl text-cream/80`} />
                <div>
                  <p className="text-cream font-display text-lg lg:text-xl">{item.label}</p>
                  <p className="text-cream/60 text-sm mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="py-6 bg-charcoal overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {[
                '2M+ Users',
                '150+ Countries',
                '500K Daily Prayers',
                '4.9 App Rating',
                'Available in 4 Languages',
                '10,000+ Sermons'
              ].map((text, idx) => (
                <span key={idx} className="font-display text-2xl lg:text-3xl text-cream/90 tracking-tight">
                  {text} <span className="text-ember mx-8">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Everything You Need</p>
              <h2 className="font-display text-5xl lg:text-7xl tracking-tight leading-[0.9]">
                One App,<br /><span className="italic">Endless Growth</span>
              </h2>
            </div>
            <div className="lg:flex lg:items-end">
              <p className="text-lg lg:text-xl text-charcoal/60 leading-relaxed max-w-md">
                We've combined every tool you need for your spiritual journey into one beautifully designed experience. No distractions, just growth.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-book-open', title: 'Daily Devotionals', desc: 'Fresh content daily with audio readings, scripture, memory verses, and multi-language support (EN, ES, FR, IT).' },
              { icon: 'fa-fire-flame-curved', title: 'Prayer Streaks', desc: 'Set daily goals, track your consistency with visual progress rings, and never break your chain of fire.' },
              { icon: 'fa-headphones', title: 'Sermon Library', desc: 'Browse by series or playlist. Full audio player with speed control, waveform visualization, and offline downloads.' },
              { icon: 'fa-hands-praying', title: 'Prayer Management', desc: 'Create prayer lists, set timers, enable focus mode with ambient sounds, and protect private prayers with biometrics.' },
              { icon: 'fa-book-bible', title: 'Bible Study', desc: 'Multiple Bible versions, verse lookup, integrated scripture readings, and global search across all resources.' },
              { icon: 'fa-highlighter', title: 'Self-Study Hub', desc: 'Your notes, bookmarks, and highlights all in one place. Rich text editing linked to devotionals and sermons.' },
              { icon: 'fa-bell', title: 'Smart Notifications', desc: 'Never miss a devotional or prayer time. Customizable push notifications with quiet hours support.' },
              { icon: 'fa-calendar-check', title: 'Church Events', desc: 'Browse upcoming events, register to attend or volunteer, and get reminders for what matters.' },
              { icon: 'fa-globe', title: 'Multi-Language', desc: 'Full app experience in English, Spanish, French, and Italian. Switch languages anytime.' },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 border border-charcoal/10 rounded-2xl hover:border-ember/30 hover:bg-ember/5 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-ember/10 flex items-center justify-center mb-6 group-hover:bg-ember/20 transition-colors">
                  <i className={`fa-solid ${feature.icon} text-xl text-ember`} />
                </div>
                <h3 className="font-display text-xl mb-3">{feature.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Devotionals Section */}
      <section id="devotionals" className="py-24 lg:py-40 bg-charcoal text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Daily Devotionals</p>
              <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[0.9] mb-8">
                Start Each Day<br /><span className="italic text-ember">With Purpose</span>
              </h2>
              <p className="text-lg text-cream/60 leading-relaxed mb-10 max-w-lg">
                Fresh devotional content delivered daily with beautiful cover images, audio readings, scripture passages, and memory verses to carry with you.
              </p>

              <div className="space-y-6">
                {[
                  { icon: 'fa-headphones', text: 'Audio player for hands-free listening' },
                  { icon: 'fa-language', text: 'Available in 4 languages' },
                  { icon: 'fa-calendar', text: 'Monthly calendar navigation' },
                  { icon: 'fa-highlighter', text: 'Highlight passages with color picker' },
                  { icon: 'fa-quote-right', text: 'Create shareable quote cards' },
                  { icon: 'fa-bookmark', text: 'Bookmark and take notes' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                      <i className={`fa-solid ${item.icon} text-ember text-sm`} />
                    </div>
                    <span className="text-cream/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <div className="mx-auto w-[280px] lg:w-[320px]">
                <div className="bg-cream/10 rounded-[3rem] p-2 shadow-2xl backdrop-blur-sm">
                  <div className="bg-gradient-to-b from-charcoal to-charcoal/95 rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <div className="flex justify-center pt-3"><div className="w-24 h-6 bg-black rounded-full" /></div>
                    <div className="p-5 pt-8">
                      <p className="text-ember text-xs tracking-widest mb-1">FEBRUARY 6, 2025</p>
                      <h3 className="font-display text-2xl text-cream mb-4">Walking in Faith</h3>

                      <div className="aspect-video bg-gradient-to-br from-ember/30 to-sage/20 rounded-xl mb-4 flex items-center justify-center">
                        <i className="fa-solid fa-play text-cream text-2xl" />
                      </div>

                      <div className="flex items-center gap-3 text-xs text-cream/60 mb-4">
                        <span><i className="fa-solid fa-clock mr-1" /> 8 min read</span>
                        <span><i className="fa-solid fa-headphones mr-1" /> Audio</span>
                        <span><i className="fa-solid fa-globe mr-1" /> EN</span>
                      </div>

                      <div className="p-4 bg-cream/5 rounded-xl border border-cream/10">
                        <p className="text-xs text-cream/60 mb-1">MEMORY VERSE</p>
                        <p className="text-sm text-cream italic">"For we walk by faith, not by sight."</p>
                        <p className="text-xs text-ember mt-2">2 Corinthians 5:7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer & Streaks Section */}
      <section id="prayer" className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Prayer & Goals</p>
            <h2 className="font-display text-5xl lg:text-7xl tracking-tight leading-[0.9]">
              Build Your<br /><span className="italic">Prayer Life</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Prayer Management */}
            <div className="bg-gradient-to-br from-sage/30 to-sage/10 rounded-3xl p-8 lg:p-12">
              <div className="w-14 h-14 rounded-2xl bg-charcoal flex items-center justify-center mb-6">
                <i className="fa-solid fa-hands-praying text-2xl text-cream" />
              </div>
              <h3 className="font-display text-3xl lg:text-4xl mb-4">Prayer Management</h3>
              <p className="text-charcoal/60 mb-8 max-w-md">
                Create and organize prayer lists with powerful tools designed to deepen your prayer practice.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'fa-lock', text: 'Private prayers with Face ID' },
                  { icon: 'fa-stopwatch', text: 'Prayer timer with countdown' },
                  { icon: 'fa-moon', text: 'Focus mode integration' },
                  { icon: 'fa-music', text: 'Ambient background sounds' },
                  { icon: 'fa-users', text: 'Suggested community prayers' },
                  { icon: 'fa-grip-vertical', text: 'Drag to reorder' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <i className={`fa-solid ${item.icon} text-charcoal/40`} />
                    <span className="text-charcoal/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Streaks */}
            <div className="bg-gradient-to-br from-ember/20 to-ember/5 rounded-3xl p-8 lg:p-12">
              <div className="w-14 h-14 rounded-2xl bg-ember flex items-center justify-center mb-6">
                <i className="fa-solid fa-fire text-2xl text-cream" />
              </div>
              <h3 className="font-display text-3xl lg:text-4xl mb-4">Daily Streaks</h3>
              <p className="text-charcoal/60 mb-8 max-w-md">
                Set daily devotional goals and track your consistency with beautiful visualizations.
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-charcoal/10" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-ember" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-2xl text-ember">75%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-charcoal/60">Today's Progress</p>
                  <p className="font-display text-xl">15 / 20 min</p>
                </div>
              </div>

              <div className="flex gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={day + idx} className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-xs ${
                    idx < 5 ? 'bg-ember text-cream' : 'bg-charcoal/5 text-charcoal/40'
                  }`}>
                    {idx < 5 ? '🔥' : day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NSPPD Live Prayer */}
      <section className="py-24 lg:py-32 bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(207,92,54,0.15),transparent_50%)]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-ember/20 border border-ember/30 mb-6">
                <div className="relative">
                  <div className="w-2 h-2 bg-ember rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-ember rounded-full animate-ping" />
                </div>
                <span className="text-ember text-sm font-medium">NSPPD Fire Prayers</span>
              </div>
              <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[0.9] mb-6">
                Join Millions<br /><span className="italic text-ember">Live Daily</span>
              </h2>
              <p className="text-lg text-cream/60 leading-relaxed mb-8 max-w-lg">
                The National Prayer Session with Pastor Jerry Eze. Join believers worldwide every weekday morning for powerful prayer.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: '7:00 AM', sub: 'WAT Daily' },
                  { label: 'Live', sub: 'Status Detection' },
                  { label: 'Replay', sub: 'Available After' },
                  { label: 'Timezone', sub: 'Auto-Adjusted' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="font-display text-2xl text-ember">{item.label}</p>
                    <p className="text-cream/40 text-sm">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <a href="https://www.youtube.com/@PastorJerryEze/streams" target="_blank" rel="noopener noreferrer" className="block aspect-video bg-gradient-to-br from-ember/20 to-charcoal rounded-2xl flex items-center justify-center border border-cream/10 hover:border-ember/50 transition-colors group">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-ember flex items-center justify-center mx-auto mb-4 animate-pulse group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-play text-cream text-2xl ml-1" />
                  </div>
                  <p className="text-cream/60 group-hover:text-cream transition-colors">Watch NSPPD Live</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Library */}
      <section id="sermons" className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1">
              <div className="bg-charcoal rounded-3xl p-6 lg:p-8">
                {/* Mini Player */}
                <div className="bg-cream/5 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-ember/20 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-headphones text-ember text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-cream font-medium truncate">The Power of Faith</p>
                      <p className="text-cream/40 text-sm">Pastor Jerry Eze</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-ember flex items-center justify-center">
                      <i className="fa-solid fa-pause text-cream text-sm" />
                    </button>
                  </div>
                  {/* Waveform */}
                  <div className="flex items-center gap-1 mt-4 h-8">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className="flex-1 bg-cream/20 rounded-full" style={{ height: `${20 + Math.random() * 80}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-cream/40 mt-2">
                    <span>12:34</span>
                    <span>45:21</span>
                  </div>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center justify-center gap-2">
                  {['0.5x', '1x', '1.5x', '2x'].map((speed, idx) => (
                    <button key={speed} className={`px-3 py-1 rounded-full text-xs ${idx === 1 ? 'bg-ember text-cream' : 'bg-cream/5 text-cream/60'}`}>
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Sermon Library</p>
              <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[0.9] mb-8">
                Thousands of<br /><span className="italic">Messages</span>
              </h2>
              <p className="text-lg text-charcoal/60 leading-relaxed mb-10 max-w-lg">
                Browse sermons by series or playlist. Our powerful audio player keeps you engaged with waveform visualization and seamless background playback.
              </p>

              <div className="space-y-4">
                {[
                  { icon: 'fa-play', text: 'Full audio player with seek and skip' },
                  { icon: 'fa-gauge', text: 'Variable playback speed (0.5x - 2x)' },
                  { icon: 'fa-wave-square', text: 'Audio waveform visualization' },
                  { icon: 'fa-download', text: 'Download for offline listening' },
                  { icon: 'fa-share', text: 'Share sermon clips with friends' },
                  { icon: 'fa-note-sticky', text: 'Link notes to specific sermons' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-ember/10 flex items-center justify-center">
                      <i className={`fa-solid ${item.icon} text-ember text-sm`} />
                    </div>
                    <span className="text-charcoal/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Study Hub */}
      <section className="py-24 lg:py-32 border-y border-charcoal/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Self-Study Hub</p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
              All Your Study<br /><span className="italic">In One Place</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-note-sticky', title: 'Notes', desc: 'Rich text notes linked to devotionals and sermons. Search, filter, and organize your thoughts.', color: 'bg-amber-500' },
              { icon: 'fa-bookmark', title: 'Bookmarks', desc: 'Save your favorite devotionals and sermons for quick access anytime.', color: 'bg-blue-500' },
              { icon: 'fa-highlighter', title: 'Highlights', desc: 'Color-coded highlighted passages from your readings, all in one searchable view.', color: 'bg-green-500' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <i className={`fa-solid ${item.icon} text-2xl text-white`} />
                </div>
                <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                <p className="text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Features Grid */}
      <section className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">And So Much More</p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight">
              Built for Your Journey
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-calendar-days', title: 'Church Events', desc: 'Register & volunteer' },
              { icon: 'fa-hand-holding-heart', title: 'Giving', desc: 'Subscriptions & one-time' },
              { icon: 'fa-scroll', title: 'Declarations', desc: 'Yearly church declarations' },
              { icon: 'fa-bell', title: 'Notifications', desc: 'Smart push alerts' },
              { icon: 'fa-moon', title: 'Dark Mode', desc: 'Easy on the eyes' },
              { icon: 'fa-text-height', title: 'Text Settings', desc: 'Adjustable font size' },
              { icon: 'fa-globe', title: 'Timezones', desc: 'Auto-adjusted times' },
              { icon: 'fa-shield', title: 'Privacy', desc: 'Biometric protection' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-charcoal/5 rounded-2xl hover:bg-ember/10 transition-colors text-center">
                <i className={`fa-solid ${item.icon} text-2xl text-ember mb-4`} />
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-charcoal/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-charcoal text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '2M+', label: 'Active Users' },
              { value: '150+', label: 'Countries' },
              { value: '500K', label: 'Daily Prayers' },
              { value: '4.9', label: 'App Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-display text-5xl lg:text-7xl tracking-tight text-ember">{stat.value}</p>
                <p className="text-sm tracking-widest uppercase text-cream/40 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <i className="fa-solid fa-dove text-6xl lg:text-8xl text-ember mb-8" />
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.9] mb-8">
            Download<br /><span className="italic text-ember">Free Today</span>
          </h2>
          <p className="text-xl text-charcoal/60 max-w-xl mx-auto mb-12">
            Start your spiritual journey with Streams of Joy. Available on iOS and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-charcoal text-cream rounded-full font-medium hover:bg-ember transition-colors flex items-center justify-center gap-3">
              <i className="fa-brands fa-apple text-2xl" />
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
                <div className="font-medium">App Store</div>
              </div>
            </a>
            <a href="https://onelink.to/sojiapp" target="_blank" rel="noopener noreferrer" className="px-10 py-5 border border-charcoal rounded-full font-medium hover:bg-charcoal hover:text-cream transition-colors flex items-center justify-center gap-3">
              <i className="fa-brands fa-google-play text-2xl" />
              <div className="text-left">
                <div className="text-xs opacity-70">Get it on</div>
                <div className="font-medium">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 lg:py-24 bg-charcoal text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <span className="font-display text-3xl tracking-tight">Streams<span className="italic text-ember">Joy</span></span>
              <p className="text-cream/40 mt-4 max-w-xs">
                Your complete spiritual companion. Daily devotionals, live prayer, sermons, and more.
              </p>
              <div className="flex gap-4 mt-6">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((s) => (
                  <a key={s} href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/40 hover:bg-ember hover:border-ember hover:text-cream transition-all">
                    <i className={`fa-brands fa-${s}`} />
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-6">
              <p className="font-medium mb-4">Features</p>
              <ul className="space-y-3 text-cream/40">
                <li><a href="#devotionals" className="hover:text-ember transition-colors">Devotionals</a></li>
                <li><a href="#prayer" className="hover:text-ember transition-colors">Prayer</a></li>
                <li><a href="#sermons" className="hover:text-ember transition-colors">Sermons</a></li>
                <li><a href="#features" className="hover:text-ember transition-colors">All Features</a></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <p className="font-medium mb-4">Company</p>
              <ul className="space-y-3 text-cream/40">
                <li><Link href="/privacy" className="hover:text-ember transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-ember transition-colors">Terms</Link></li>
                <li><Link href="/user/request-deletion" className="hover:text-ember transition-colors">Data Deletion</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <p className="font-medium mb-4">Support</p>
              <ul className="space-y-3 text-cream/40">
                <li><a href="mailto:support@streamsofjoy.com" className="hover:text-ember transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-ember transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-cream/10 text-sm text-cream/30">
            <p>&copy; {new Date().getFullYear()} Consonant Technologies Ltd.</p>
            <p>Made with <i className="fa-solid fa-heart text-ember" /> for the Kingdom</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
