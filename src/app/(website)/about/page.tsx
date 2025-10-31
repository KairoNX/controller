import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Slide</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Transform Your Instagram Engagement with AI-Powered Automation
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Slide, we believe that meaningful connections drive business success. Our mission is to empower content creators, 
              businesses, and influencers to scale their Instagram presence without sacrificing the personal touch that makes 
              social media special.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Slide is a powerful Instagram automation platform that revolutionizes how you connect with your audience. 
              We help you:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Automate DM responses with intelligent keyword triggers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Reply to comments automatically to boost engagement</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use AI-powered responses that feel natural and contextual</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Turn interactions into valuable business opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Track performance with detailed analytics</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Slide?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Respond to your audience in seconds, not hours. Our automation ensures no message goes unanswered.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Smart AI generates contextual responses that feel natural, maintaining your brand voice.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Easy Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Get started in minutes with our intuitive interface. No technical knowledge required.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with 99.9% uptime. Your data and Instagram account are safe with us.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-muted-foreground leading-relaxed">
              Built with modern web technologies including Next.js, TypeScript, and OpenAI, Slide provides 
              a seamless experience that's both powerful and easy to use. We leverage cutting-edge AI to understand 
              context and generate appropriate responses, while our robust infrastructure ensures your automations 
              run smoothly 24/7.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Join Thousands of Happy Users</h2>
            <div className="grid grid-cols-3 gap-8 text-center mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5M+</div>
                <div className="text-sm text-muted-foreground">Messages Sent</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              From solopreneurs to large agencies, thousands of users trust Slide to manage their Instagram 
              engagement. Join them today and see the difference automation can make for your business.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Start automating your Instagram engagement today with our free plan.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
            </Link>
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

