import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Streams of Joy',
  description: 'Terms of Service for the Streams of Joy mobile application and website.',
}

export default function TermsPage() {
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
            <i className="fa-solid fa-file-contract text-gold-400 text-xs" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: February 6, 2025
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 lg:p-12">
          <div className="space-y-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the Streams of Joy mobile application and website (the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
              <p className="leading-relaxed mt-4">
                These Terms constitute a legally binding agreement between you and Consonant Technologies Ltd. ("Company," "we," "us," or "our") regarding your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">2. Description of Services</h2>
              <p className="leading-relaxed">
                Streams of Joy is a spiritual and prayer community platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Live streaming of prayer sessions and spiritual content</li>
                <li>Prayer tracking and streak features</li>
                <li>In-app Bible reading and note-taking capabilities</li>
                <li>Community features for sharing testimonies and prayer requests</li>
                <li>Audio content for offline listening</li>
                <li>Donation and partnership opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">3. Account Registration</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">3.1 Account Creation</h3>
              <p className="leading-relaxed">
                To access certain features of the Services, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">3.2 Account Security</h3>
              <p className="leading-relaxed">
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">3.3 Age Requirements</h3>
              <p className="leading-relaxed">
                You must be at least 13 years of age to use the Services. If you are under 18, you represent that you have your parent's or guardian's permission to use the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">4. Acceptable Use</h2>
              <p className="leading-relaxed mb-4">
                You agree NOT to use the Services to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Post content that is defamatory, obscene, or offensive</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Distribute spam, malware, or viruses</li>
                <li>Attempt to gain unauthorized access to the Services</li>
                <li>Use automated systems to access the Services without permission</li>
                <li>Misrepresent your identity or affiliation</li>
                <li>Use the Services for commercial purposes without our consent</li>
                <li>Interfere with the proper functioning of the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">5. User Content</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">5.1 Your Content</h3>
              <p className="leading-relaxed">
                You retain ownership of any content you submit, post, or display through the Services ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the Services.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">5.2 Content Standards</h3>
              <p className="leading-relaxed">
                All User Content must comply with these Terms and our community guidelines. We reserve the right to remove any content that violates these Terms or that we find objectionable.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">5.3 Prayer Requests and Testimonies</h3>
              <p className="leading-relaxed">
                When you share prayer requests or testimonies, you understand that this content may be visible to other users of the Services. Please do not share sensitive personal information in public areas of the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">6. Donations and Payments</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">6.1 Donations</h3>
              <p className="leading-relaxed">
                Donations made through the Services are voluntary contributions to support our ministry. All donations are final and non-refundable unless required by law.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">6.2 Payment Processing</h3>
              <p className="leading-relaxed">
                All payments are processed through secure third-party payment processors. We do not store your complete payment card information on our servers.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">6.3 Recurring Donations</h3>
              <p className="leading-relaxed">
                If you set up recurring donations, you authorize us to charge your payment method on a recurring basis until you cancel. You may cancel recurring donations at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">7. Intellectual Property</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">7.1 Our Content</h3>
              <p className="leading-relaxed">
                The Services and their original content, features, and functionality are owned by Consonant Technologies Ltd. and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">7.2 Limited License</h3>
              <p className="leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use the Services for your personal, non-commercial use. This license does not include the right to modify, distribute, or create derivative works.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">7.3 Trademarks</h3>
              <p className="leading-relaxed">
                "Streams of Joy," our logo, and other marks are trademarks of Consonant Technologies Ltd. You may not use our trademarks without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">8. Third-Party Services</h2>
              <p className="leading-relaxed">
                The Services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites or services. Your use of third-party services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">9. Disclaimers</h2>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">9.1 "As Is" Basis</h3>
              <p className="leading-relaxed">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-bold text-white mb-3 mt-6">9.2 Spiritual Content</h3>
              <p className="leading-relaxed">
                The spiritual content provided through the Services is for inspirational and educational purposes only. It is not intended to replace professional medical, legal, financial, or other expert advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CONSONANT TECHNOLOGIES LTD., ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
              <p className="leading-relaxed mt-4">
                Our total liability to you for any claims arising from your use of the Services shall not exceed the amount you have paid to us in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">11. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Consonant Technologies Ltd. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services or your violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">12. Termination</h2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, with or without notice. Upon termination, your right to use the Services will immediately cease.
              </p>
              <p className="leading-relaxed mt-4">
                You may terminate your account at any time by contacting us or using the account deletion feature in the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">13. Changes to Terms</h2>
              <p className="leading-relaxed">
                We may modify these Terms at any time. We will notify you of material changes by posting the new Terms on the Services and updating the "Last Updated" date. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">14. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Consonant Technologies Ltd. is registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">15. Dispute Resolution</h2>
              <p className="leading-relaxed">
                Any disputes arising from these Terms or your use of the Services shall first be attempted to be resolved through good faith negotiation. If a resolution cannot be reached, the dispute shall be submitted to binding arbitration in accordance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">16. Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">17. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="font-bold text-white mb-2">Consonant Technologies Ltd.</p>
                <p>Email: <a href="mailto:legal@streamsofjoy.com" className="text-gold-400 hover:text-gold-300">legal@streamsofjoy.com</a></p>
                <p className="mt-2">General Support: <a href="mailto:support@streamsofjoy.com" className="text-gold-400 hover:text-gold-300">support@streamsofjoy.com</a></p>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gold-400 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-shield-halved" />
            Read our Privacy Policy
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
