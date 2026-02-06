import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Streams of Joy',
  description: 'Terms of Service for the Streams of Joy mobile application and website.',
}

export default function TermsPage() {
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
          <h1 className="font-display text-5xl lg:text-6xl tracking-tight mb-4">Terms of Service</h1>
          <p className="text-charcoal/60">Last updated: February 6, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">1. Agreement to Terms</h2>
              <p>By accessing or using the Streams of Joy mobile application and website, you agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you and Consonant Technologies Ltd.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">2. Description of Services</h2>
              <p>Streams of Joy is a spiritual and prayer community platform providing:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Live streaming of prayer sessions and spiritual content</li>
                <li>Prayer tracking and streak features</li>
                <li>In-app Bible reading and note-taking</li>
                <li>Community features for testimonies and prayer requests</li>
                <li>Audio content for offline listening</li>
                <li>Donation and partnership opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">3. Account Registration</h2>
              <p>To access certain features, you may need to create an account. You agree to provide accurate information and are responsible for safeguarding your account credentials. You must be at least 13 years of age to use the Services.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">4. Acceptable Use</h2>
              <p>You agree NOT to use the Services to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Post defamatory, obscene, or offensive content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Distribute spam, malware, or viruses</li>
                <li>Attempt unauthorized access to the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">5. User Content</h2>
              <p>You retain ownership of content you submit. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use such content in connection with the Services. When sharing prayer requests or testimonies, please avoid sharing sensitive personal information.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">6. Donations</h2>
              <p>Donations are voluntary contributions and are final and non-refundable unless required by law. Payments are processed through secure third-party processors. Recurring donations may be cancelled at any time.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">7. Intellectual Property</h2>
              <p>The Services and their content are owned by Consonant Technologies Ltd. and protected by intellectual property laws. You are granted a limited, non-exclusive license for personal, non-commercial use.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">8. Disclaimers</h2>
              <p>THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. Spiritual content is for inspirational purposes only and not intended to replace professional advice.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">10. Termination</h2>
              <p>We reserve the right to suspend or terminate your access at any time. You may terminate your account by contacting us or using the account deletion feature.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">11. Contact Us</h2>
              <div className="p-6 bg-charcoal/5 rounded-2xl mt-4">
                <p className="font-semibold text-charcoal">Consonant Technologies Ltd.</p>
                <p className="mt-2">Email: <a href="mailto:legal@streamsofjoy.com" className="text-ember">legal@streamsofjoy.com</a></p>
                <p>Support: <a href="mailto:support@streamsofjoy.com" className="text-ember">support@streamsofjoy.com</a></p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal/10 flex justify-between text-sm text-charcoal/60">
          <Link href="/privacy" className="hover:text-ember transition-colors">Read Privacy Policy</Link>
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
