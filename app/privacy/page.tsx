import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Streams of Joy',
  description: 'Privacy Policy for the Streams of Joy mobile application and website.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="font-display text-2xl tracking-tight">
              Streams<span className="italic text-ember">Joy</span>
            </Link>
            <Link href="/" className="text-sm text-charcoal/60 hover:text-ember transition-colors flex items-center gap-2">
              <i className="fa-solid fa-arrow-left" /> Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">Legal</p>
          <h1 className="font-display text-5xl lg:text-6xl tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-charcoal/60">Last updated: February 6, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">1. Introduction</h2>
              <p>Welcome to Streams of Joy. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">2. Information We Collect</h2>
              <h3 className="font-semibold text-charcoal text-lg mt-6 mb-3">Personal Information You Provide</h3>
              <p>We collect personal information that you voluntarily provide when you register for an account, participate in activities, or contact us directly. This may include:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name and contact data (email, phone number)</li>
                <li>Account credentials</li>
                <li>Payment data (processed securely through payment processors)</li>
                <li>Prayer requests and testimonies you choose to share</li>
              </ul>

              <h3 className="font-semibold text-charcoal text-lg mt-6 mb-3">Automatically Collected Information</h3>
              <p>When you access our Services, we automatically collect device information, usage data, and general location based on IP address.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate account creation and authentication</li>
                <li>Send prayer reminders and notifications (with consent)</li>
                <li>Process donations and contributions</li>
                <li>Provide customer support</li>
                <li>Analyze usage to improve our Services</li>
                <li>Protect our Services and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">4. Sharing Your Information</h2>
              <p>We may share information with service providers, for legal obligations, during business transfers, or with your consent. <strong className="text-charcoal">We do not sell your personal information.</strong></p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">5. Your Rights</h2>
              <p>Depending on your location, you may have rights to access, correct, delete, or port your data. To exercise these rights, visit our <Link href="/user/request-deletion" className="text-ember hover:underline">Data Deletion Request</Link> page or contact us at <a href="mailto:privacy@streamsofjoy.com" className="text-ember hover:underline">privacy@streamsofjoy.com</a>.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">6. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">7. Contact Us</h2>
              <div className="p-6 bg-charcoal/5 rounded-2xl mt-4">
                <p className="font-semibold text-charcoal">Consonant Technologies Ltd.</p>
                <p className="mt-2">Email: <a href="mailto:privacy@streamsofjoy.com" className="text-ember">privacy@streamsofjoy.com</a></p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal/10 flex justify-between text-sm text-charcoal/60">
          <Link href="/terms" className="hover:text-ember transition-colors">Read Terms of Service</Link>
          <Link href="/" className="hover:text-ember transition-colors">Return Home</Link>
        </div>
      </main>

      <footer className="border-t border-charcoal/10 py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-sm text-charcoal/40">
          &copy; {new Date().getFullYear()} Consonant Technologies Ltd.
        </div>
      </footer>
    </div>
  )
}
