import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <LogoSmall />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Slide ("the Service"), you accept and agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, please do not use the Service. We reserve the right to 
              modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Slide provides Instagram automation tools that allow users to automate direct messages, comment replies, 
              and engagement activities. The Service includes AI-powered response generation, keyword triggers, and 
              analytics features. We reserve the right to modify, suspend, or discontinue any part of the Service at 
              any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">3.1 Account Creation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You must create an account to use the Service. You agree to provide accurate, current, and complete 
                  information during registration and to update such information to keep it accurate and current.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3.2 Account Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You must immediately notify us of any unauthorized use 
                  of your account.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3.3 Account Eligibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You must be at least 13 years old to use the Service. By using the Service, you represent that you 
                  meet this age requirement.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Violate any applicable laws or regulations</li>
              <li>• Violate Instagram's Terms of Service or Community Guidelines</li>
              <li>• Send spam, unsolicited messages, or engage in harassment</li>
              <li>• Impersonate any person or entity</li>
              <li>• Interfere with or disrupt the Service or servers</li>
              <li>• Attempt to gain unauthorized access to the Service</li>
              <li>• Use the Service for any illegal or fraudulent purposes</li>
              <li>• Transmit viruses, malware, or harmful code</li>
              <li>• Scrape or collect data from the Service without permission</li>
              <li>• Resell or redistribute the Service without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Instagram Integration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Service integrates with Instagram through official APIs. By using the Service:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• You authorize us to access your Instagram account as necessary to provide the Service</li>
              <li>• You acknowledge that Instagram's terms and policies apply to your use of Instagram</li>
              <li>• You understand that Instagram may revoke access at any time</li>
              <li>• You are responsible for compliance with Instagram's rate limits and policies</li>
              <li>• We are not responsible for changes to Instagram's API or policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payments</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">6.1 Subscription Plans</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Service offers both free and paid subscription plans. Paid plans are billed on a recurring basis 
                  (monthly or annually) until cancelled.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">6.2 Payment Processing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Payments are processed through Stripe. By providing payment information, you authorize us to charge 
                  your payment method for the applicable fees.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">6.3 Refunds</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fees are non-refundable except as required by law or as explicitly stated in our refund policy. 
                  You may cancel your subscription at any time, but no refunds will be provided for partial billing periods.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">6.4 Price Changes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to change our pricing at any time. Price changes will not affect your current 
                  billing cycle but will apply to subsequent billing periods.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">7.1 Our Rights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Slide and are 
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">7.2 Your Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain all rights to the content you create using the Service. By using the Service, you grant 
                  us a license to use, store, and process your content solely to provide the Service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers and Limitation of Liability</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">8.1 Service Availability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Service is provided "as is" and "as available" without warranties of any kind. We do not 
                  guarantee that the Service will be uninterrupted, secure, or error-free.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">8.2 Limitation of Liability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Slide shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages resulting from your use of or inability to use the Service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">8.3 Instagram Actions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for any actions taken by Instagram against your account, including but not 
                  limited to account suspension or termination.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Slide and its officers, directors, employees, and agents from 
              any claims, damages, losses, liabilities, and expenses arising out of your use of the Service, violation 
              of these Terms, or violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account and access to the Service at any time, with or 
              without cause, with or without notice. Reasons for termination may include:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Violation of these Terms</li>
              <li>• Fraudulent or illegal activity</li>
              <li>• Non-payment of fees</li>
              <li>• Prolonged inactivity</li>
              <li>• At our sole discretion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
              without regard to its conflict of law provisions. Any disputes arising from these Terms shall be 
              resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. Material changes will be notified 
              via email or through the Service. Your continued use of the Service after changes constitutes acceptance 
              of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited 
              or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-6 border rounded-lg">
              <p className="text-muted-foreground">Email: legal@slide.com</p>
              <p className="text-muted-foreground">Address: [Your Company Address]</p>
            </div>
          </section>

          <section className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Important Notice</h3>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              By using Slide, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
              If you do not agree to these Terms, you must not use the Service.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background mt-12">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Slide. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

