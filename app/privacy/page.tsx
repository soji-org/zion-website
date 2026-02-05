import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Streams of Joy',
  description: 'Privacy Policy for the Streams of Joy mobile application and website.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-midnight-900 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="glow-orb glow-orb-1 opacity-30" />
        <div className="glow-orb glow-orb-2 opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-midnight-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-dove text-midnight-950" />
              </div>
              <span className="font-serif font-bold text-xl tracking-[0.2em] text-white">
                STREAMS<span className="text-gold-400">JOY</span>
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <i className="fa-solid fa-shield-halved text-gold-400 text-xs" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: February 6, 2025
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 lg:p-12">
          <div className="space-y-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Streams of Joy ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Services").
              </p>
              <p className="leading-relaxed mt-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">2.1 Personal Information You Provide</h3>
              <p className="leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for an account</li>
                <li>Express interest in obtaining information about us or our Services</li>
                <li>Participate in activities on the Services</li>
                <li>Contact us directly</li>
              </ul>
              <p className="leading-relaxed mt-4">
                The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Name and Contact Data:</strong> First name, last name, email address, and phone number</li>
                <li><strong className="text-white">Credentials:</strong> Passwords and similar security information used for authentication</li>
                <li><strong className="text-white">Payment Data:</strong> Data necessary to process your payments (processed securely through our payment processors)</li>
                <li><strong className="text-white">Prayer Requests:</strong> Information you share in prayer requests or testimonies</li>
              </ul>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">2.2 Information Automatically Collected</h3>
              <p className="leading-relaxed">
                When you access our Services, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong className="text-white">Device Information:</strong> Device type, operating system, unique device identifiers</li>
                <li><strong className="text-white">Usage Data:</strong> App features accessed, time spent in app, crash data</li>
                <li><strong className="text-white">Location Data:</strong> General location based on IP address (we do not collect precise GPS location)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect or receive to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate account creation and authentication</li>
                <li>Send you prayer reminders and notifications (with your consent)</li>
                <li>Process donations and partnership contributions</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Analyze app usage to improve our Services</li>
                <li>Send administrative information and updates</li>
                <li>Protect our Services and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">4. Sharing Your Information</h2>
              <p className="leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Service Providers:</strong> With third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                <li><strong className="text-white">Legal Obligations:</strong> If required by law or to protect our rights</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong className="text-white">With Your Consent:</strong> For any other purpose with your explicit consent</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">We do not sell your personal information to third parties.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">5. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide you Services. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p className="leading-relaxed mt-4">
                When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">6. Your Privacy Rights</h2>
              <p className="leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data</li>
                <li><strong className="text-white">Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong className="text-white">Opt-out:</strong> Opt out of marketing communications</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, please visit our{' '}
                <Link href="/user/request-deletion" className="text-gold-400 hover:text-gold-300 underline">
                  Data Deletion Request
                </Link>{' '}
                page or contact us at{' '}
                <a href="mailto:privacy@streamsofjoy.com" className="text-gold-400 hover:text-gold-300 underline">
                  privacy@streamsofjoy.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">7. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">8. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our Services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to ensure your personal information remains protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this privacy policy periodically. Continued use of the Services after any changes constitutes your acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">11. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions or concerns about this privacy policy or our practices, please contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="font-bold text-white mb-2">Consonant Technologies Ltd.</p>
                <p>Email: <a href="mailto:privacy@streamsofjoy.com" className="text-gold-400 hover:text-gold-300">privacy@streamsofjoy.com</a></p>
                <p className="mt-2">For data deletion requests, visit our <Link href="/user/request-deletion" className="text-gold-400 hover:text-gold-300">Data Deletion Request</Link> page.</p>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gold-400 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-file-contract" />
            Read our Terms of Service
          </Link>
          <Link href="/" className="hover:text-gold-400 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-home" />
            Return to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Consonant Technologies Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
