'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="antialiased selection:bg-gold-500 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="glow-spot bg-purple-900/30 w-[800px] h-[800px] -top-40 -left-40"></div>
        <div className="glow-spot bg-gold-600/20 w-[600px] h-[600px] top-1/4 right-0"></div>
        <div className="glow-spot bg-blue-900/30 w-[900px] h-[900px] bottom-0 left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute inset-0 grid-pattern z-0"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 top-0 border-b border-white/5 transition-all duration-300 ${
        isScrolled ? 'bg-midnight-900/95 backdrop-blur-md' : 'bg-midnight-900/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gold-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <i className="fa-solid fa-dove relative z-10 w-full h-full flex items-center justify-center text-2xl text-white"></i>
              </div>
              <span className="font-serif font-bold text-xl tracking-widest text-white">
                STREAMS<span className="text-gold-400">JOY</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-400">
              <Link href="#altar" className="hover:text-white transition-colors">THE ALTAR</Link>
              <Link href="#testimonies" className="hover:text-white transition-colors">TESTIMONIES</Link>
              <Link href="#giving" className="hover:text-white transition-colors">GIVING</Link>
              <Link href="#download" className="px-6 py-2.5 bg-white text-midnight-900 rounded-full font-bold hover:bg-gold-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                GET APP
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 relative">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-gold-500/30 animate-float">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-widest text-gold-300 uppercase">
                NSPPD Fire Prayers • 7AM Daily
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] tracking-tighter">
              WHAT GOD <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                CANNOT DO
              </span> <br/>
              <span className="text-gradient-gold italic pr-4">DOES NOT EXIST.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed border-l-2 border-gold-500/50 pl-6">
              Your digital altar for the miraculous. Join millions in the 7AM Fire Prayers, 
              track your spiritual streaks, and carry the atmosphere of miracles in your pocket.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gold-500 text-midnight-900 font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="relative flex items-center gap-2">
                  <i className="fa-brands fa-apple text-xl"></i> App Store
                </span>
              </button>
              <button className="px-8 py-4 glass-panel text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 border border-white/20">
                <i className="fa-brands fa-google-play text-xl text-gold-400"></i> Play Store
              </button>
            </div>

            {/* Social Proof Pill */}
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-midnight-900 bg-gray-700 flex items-center justify-center text-white text-xs"
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-midnight-900 bg-gold-500 text-midnight-900 flex items-center justify-center font-bold text-sm">
                  +2M
                </div>
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">Global Prayer Warriors</p>
                <p className="text-gold-400/80">Connected right now</p>
              </div>
            </div>
          </div>

          {/* Hero Visual (3D Phone) */}
          <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center">
            {/* Abstract Elements behind phone */}
            <div className="absolute w-64 h-64 border border-gold-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute w-80 h-80 border border-white/5 rounded-full animate-spin-slow reverse-spin"></div>
            
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <FeaturesSection />

      {/* The Testimony Wall (Marquee) */}
      <TestimonyWall />

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
    <div className="relative w-[300px] phone-mockup bg-midnight-800 rounded-[3rem] border-[8px] border-gray-800 overflow-hidden h-[600px]">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
      
      {/* Screen Content */}
      <div className="h-full w-full bg-midnight-900 flex flex-col text-white overflow-hidden relative">
        {/* Status Bar */}
        <div className="flex justify-between px-6 pt-3 text-[10px] text-gray-400">
          <span>9:41</span>
          <div className="flex gap-1">
            <i className="fa-solid fa-signal"></i>
            <i className="fa-solid fa-wifi"></i>
            <i className="fa-solid fa-battery-full"></i>
          </div>
        </div>

        {/* App Header */}
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gold-500 text-xs font-bold tracking-wider">GOOD MORNING</p>
              <h3 className="font-serif text-xl">Pastor Jerry</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ring-1 ring-white/10">
              <i className="fa-solid fa-bell text-sm"></i>
            </div>
          </div>
        </div>

        {/* Streak Card (Hero Feature) */}
        <div className="mx-4 mt-2 p-4 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-400 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <i className="fa-solid fa-fire text-6xl"></i>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-solid fa-fire text-white animate-pulse streak-flame"></i>
              <span className="text-xs font-bold text-white/90 uppercase">Current Streak</span>
            </div>
            <div className="text-4xl font-bold text-white font-serif">
              12 <span className="text-lg font-sans font-normal opacity-80">Days</span>
            </div>
            <div className="mt-3 flex gap-1">
              <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[80%]"></div>
              </div>
            </div>
            <p className="text-[10px] mt-2 text-white/90">
              "Fire doesn't require permission to burn."
            </p>
          </div>
        </div>

        {/* Live Session Prompt */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <div className="flex-1">
            <p className="text-xs font-bold text-red-400">NSPPD LIVE NOW</p>
            <p className="text-[10px] text-gray-400">Oh Lord, Show Me Mercy</p>
          </div>
          <button className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg">JOIN</button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <i className="fa-solid fa-book-bible text-xs"></i>
            </div>
            <p className="font-bold text-sm">Bible</p>
            <p className="text-[10px] text-gray-500">KJV, NIV & AMP</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-2">
              <i className="fa-solid fa-list-check text-xs"></i>
            </div>
            <p className="font-bold text-sm">Prayers</p>
            <p className="text-[10px] text-gray-500">My List</p>
          </div>
        </div>
        
        {/* Bottom Nav */}
        <div className="mt-auto bg-black/40 backdrop-blur-md border-t border-white/5 p-4 flex justify-between items-center text-gray-500 text-xl">
          <i className="fa-solid fa-house text-gold-500"></i>
          <i className="fa-solid fa-compass hover:text-gray-300"></i>
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black -mt-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <i className="fa-solid fa-plus"></i>
          </div>
          <i className="fa-solid fa-book-open hover:text-gray-300"></i>
          <i className="fa-solid fa-user hover:text-gray-300"></i>
        </div>
      </div>
    </div>
  )
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Prayer Fire Streaks",
      description: "Consistency is the key to spiritual growth. Visualize your commitment with daily streaks. Don't break the chain.",
      icon: "fa-fire",
      color: "gold",
      size: "large"
    },
    {
      id: 2,
      title: "In-App Bible",
      description: "Read scriptures without leaving the stream. Highlight & Note.",
      icon: "fa-book-bible",
      color: "blue"
    },
    {
      id: 3,
      title: "My Evidence",
      description: "Tick off prayer points as they become testimonies.",
      icon: "fa-clipboard-check",
      color: "green"
    },
    {
      id: 4,
      title: "Rhema Notes",
      description: "Capture revelations instantly. Your notes are synced to the cloud and searchable.",
      icon: "fa-pen-to-square",
      color: "purple",
      size: "wide"
    },
    {
      id: 5,
      title: "Download Audio",
      description: "Listen offline anywhere.",
      icon: "fa-download",
      color: "gray"
    }
  ]

  return (
    <section className="py-24 relative z-10 bg-midnight-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-sm font-bold tracking-widest uppercase mb-2 block">Features</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Equip Your <span className="text-gradient-gold italic">Spirit Man</span>
          </h2>
          <p className="text-gray-400">
            We didn't just build an app; we built a digital prayer room designed to minimize distraction and maximize connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {/* Feature: Streaks (Large) */}
          <div className="md:col-span-2 lg:col-span-2 row-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-gold-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 text-2xl mb-4">
                  <i className="fa-solid fa-fire"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Prayer Fire Streaks</h3>
                <p className="text-gray-400">
                  Consistency is the key to spiritual growth. Visualize your commitment with daily streaks. Don't break the chain.
                </p>
              </div>
              
              {/* UI Visualization */}
              <div className="mt-6 flex gap-2">
                {['MON', 'TUE', 'WED', 'THU'].map((day, idx) => (
                  <div 
                    key={day}
                    className={`flex-1 h-16 ${
                      idx === 2 
                        ? 'bg-gradient-to-b from-gold-500/20 to-transparent border border-gold-500/40' 
                        : idx < 2 
                          ? 'bg-white/5 border border-white/5'
                          : 'bg-white/5 border border-white/5 opacity-50'
                    } rounded-lg flex flex-col items-center justify-center`}
                  >
                    <span className={`text-xs ${idx === 2 ? 'text-gold-300 font-bold' : 'text-gray-500'}`}>
                      {day}
                    </span>
                    {idx < 2 && <i className="fa-solid fa-check text-gold-500 mt-1"></i>}
                    {idx === 2 && <i className="fa-solid fa-fire text-gold-500 mt-1 animate-pulse"></i>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other Features */}
          <FeatureCard
            icon="fa-book-bible"
            title="In-App Bible"
            description="Read scriptures without leaving the stream. Highlight & Note."
            color="blue"
          />
          
          <FeatureCard
            icon="fa-clipboard-check"
            title="My Evidence"
            description="Tick off prayer points as they become testimonies."
            color="green"
          />

          {/* Sermon Notes - Wide */}
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden group md:col-span-2">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
            <div className="flex h-full items-center justify-between relative z-10">
              <div className="w-1/2">
                <i className="fa-solid fa-pen-to-square text-3xl text-purple-400 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Rhema Notes</h3>
                <p className="text-sm text-gray-400">
                  Capture revelations instantly. Your notes are synced to the cloud and searchable.
                </p>
              </div>
              <div className="w-[45%] bg-white/5 rounded-xl p-3 border border-white/5 text-[10px] font-mono text-gray-400 rotate-2 group-hover:rotate-0 transition-transform">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gold-400 mb-1">Topic: Mercy</p>
                <p className="line-clamp-3">
                  The mercy of God speaks over judgment. When mercy speaks, protocols are suspended...
                </p>
              </div>
            </div>
          </div>

          {/* Offline Mode */}
          <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer border-dashed border-2 border-white/10 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-download text-2xl text-gray-400 group-hover:text-gold-400"></i>
            </div>
            <h3 className="font-bold">Download Audio</h3>
            <p className="text-xs text-gray-500 mt-1">Listen offline anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description, color }: any) {
  const colorClasses: any = {
    blue: 'from-blue-500/10 text-blue-400',
    green: 'from-green-500/10 text-green-400',
    purple: 'from-purple-500/10 text-purple-400'
  }

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative z-10">
        <i className={`fa-solid ${icon} text-3xl ${colorClasses[color]} mb-4`}></i>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}

// Testimony Wall Component
function TestimonyWall() {
  const testimonies = [
    "WHAT GOD CANNOT DO DOES NOT EXIST",
    "MY EVIDENCE IS HERE",
    "IT IS DONE",
    "CONGRATULATIONS",
    "EL-ROI"
  ]

  return (
    <section className="py-12 bg-gold-500 overflow-hidden relative">
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20 mix-blend-multiply'></div>
      
      <div className="flex animate-marquee">
        <div className="flex gap-8 px-4 whitespace-nowrap">
          {testimonies.map((text, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-4xl font-serif font-bold text-midnight-900 opacity-80">{text}</span>
              <span className="text-4xl font-serif font-bold text-white opacity-50">*</span>
            </div>
          ))}
        </div>
        <div className="flex gap-8 px-4 whitespace-nowrap">
          {testimonies.map((text, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8">
              <span className="text-4xl font-serif font-bold text-midnight-900 opacity-80">{text}</span>
              <span className="text-4xl font-serif font-bold text-white opacity-50">*</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section Component
function CTASection() {
  return (
    <section id="download" className="relative py-32 flex items-center justify-center overflow-hidden">
      {/* Ethereal Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <i className="fa-solid fa-dove text-5xl text-white mb-8 animate-bounce"></i>
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
          Don't Miss The <br/><span className="text-gold-400">Next Move.</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          The atmosphere of miracles is waiting for you. Download the Streams of Joy app now and set your altar on fire.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="px-10 py-4 bg-white text-midnight-900 font-bold rounded-full hover:bg-gold-400 hover:scale-105 transition-all shadow-xl shadow-white/10">
            <i className="fa-brands fa-apple mr-2"></i> Download for iOS
          </button>
          <button className="px-10 py-4 glass-panel text-white font-bold rounded-full hover:bg-white/10 border border-white/20 hover:scale-105 transition-all">
            <i className="fa-brands fa-android mr-2"></i> Download for Android
          </button>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-midnight-950 border-t border-white/5 py-12 text-center text-gray-600 text-sm relative z-10">
      <p>&copy; {new Date().getFullYear()} Consonant Technologies Ltd. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
        <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms</Link>
        <Link href="/support" className="hover:text-gold-400 transition-colors">Support</Link>
      </div>
    </footer>
  )
}