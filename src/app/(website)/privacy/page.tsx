import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Slide. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit 
              our website and use our services, and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect and process the following types of information:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Account Information:</strong> Name, email address, and authentication credentials when you create an account
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Instagram Data:</strong> Instagram account information, posts, comments, and messages necessary to provide automation services
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Usage Data:</strong> Information about how you use our service, including automation settings and performance metrics
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Payment Information:</strong> Billing details processed securely through our payment processor (Stripe)
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and cookies
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• To provide and maintain our automation services</li>
              <li>• To process your transactions and manage your subscription</li>
              <li>• To send you service-related notifications and updates</li>
              <li>• To respond to your requests and provide customer support</li>
              <li>• To improve our services and develop new features</li>
              <li>• To detect and prevent fraud and abuse</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal data. We may share your information with:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Service Providers:</strong> Third-party companies that help us operate our service (e.g., Stripe for payments, OpenAI for AI features)
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Instagram/Meta:</strong> As required to provide Instagram automation services
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">•</span>
                <div>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
              and regular security audits. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to provide our services and comply with 
              legal obligations. When you delete your account, we will delete or anonymize your personal data, 
              except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your data</li>
              <li>• Object to processing of your data</li>
              <li>• Request data portability</li>
              <li>• Withdraw consent at any time</li>
              <li>• Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@slide.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage, and 
              provide personalized content. You can control cookies through your browser settings, though this 
              may affect the functionality of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service integrates with third-party platforms (Instagram, Stripe, OpenAI) that have their own 
              privacy policies. We encourage you to review their policies to understand how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children&#39;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not intended for users under the age of 13. We do not knowingly collect personal 
              data from children under 13. If you believe we have collected data from a child, please contact us 
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by 
              posting the new policy on this page and updating the &#34;Last updated&#34; date. Your continued use of our 
              service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-6 border rounded-lg">
              <p className="text-muted-foreground">Email: privacy@slide.com</p>
              <p className="text-muted-foreground">Address: [Your Company Address]</p>
            </div>
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

