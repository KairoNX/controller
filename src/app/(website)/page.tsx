import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, Sparkles, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoSmall } from '@/svgs/logo-small'
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  // Structured data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zenus',
    description: 'Instagram Automation Platform with AI-powered engagement tools',
    url: 'https://zenus.space',
    logo: 'https://zenus.space/zenus-logo-full.png',
    sameAs: [
      'https://twitter.com/ZenusSpace',
      'https://discord.gg/zenus'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@zenus.space',
      contactType: 'Customer Support'
    }
  }

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zenus',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000'
    }
  }

  const plans = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '$99',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
      popular: true,
    },
  ]
  
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      
      <main className="scroll-smooth">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative">
          <div className="container px-4 py-6 md:py-8">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                <LogoSmall />
              </Link>
              <nav className="hidden space-x-8 text-sm text-blue-200 md:flex">
                <Link href="#features" className="transition-colors hover:text-white">
                  Features
                </Link>
                <Link href="#pricing" className="transition-colors hover:text-white">
                  Pricing
                </Link>
                <Link href="#about" className="transition-colors hover:text-white">
                  About
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <ClerkLoading>
                  <div className="w-9 h-9 rounded-full bg-blue-800/50 animate-pulse" />
                </ClerkLoading>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="bg-blue-800 text-blue-100 hover:bg-blue-700 hover:text-white transition-all hover:scale-105">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <Link href="/dashboard">
                      Dashboard
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                        userButtonPopoverCard: "bg-slate-900 border-blue-800",
                      }
                    }}
                  />
                </SignedIn>
              </div>
            </div>

            {/* Hero Content */}
            <div className="mx-auto mt-16 md:mt-24 max-w-4xl text-center pb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-blue-200 bg-blue-900/50 rounded-full border border-blue-700/50 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>Transform Your Instagram Engagement</span>
              </div>
              
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Automate & Amplify Your{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Instagram Success
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
                Zenus revolutionizes how you connect with your audience on
                Instagram. Automate responses and boost engagement effortlessly,
                turning interactions into valuable business opportunities.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <Link href="/dashboard">
                    Get Started Free
                    <Zap className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-blue-400 text-blue-200 hover:bg-blue-900/50 hover:text-white transition-all"
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-blue-300 mt-1">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">5M+</div>
                  <div className="text-sm text-blue-300 mt-1">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-blue-300 mt-1">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-48 md:h-96 w-full max-w-5xl mx-auto mt-8 rounded-xl overflow-hidden shadow-2xl border border-blue-700/50">
              <Image
                src="/Ig-creators.png"
                alt="Instagram creators using Zenus"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Zenus?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you grow your Instagram presence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Automate your Instagram responses in seconds with our intelligent system
              </p>
            </div>
            
            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Smart AI generates contextual responses that feel natural and engaging
              </p>
            </div>
            
            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Faster</h3>
              <p className="text-muted-foreground">
                Turn engagement into conversions with targeted messaging strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg">
              Select the perfect plan to boost your Instagram engagement
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col justify-between transition-all hover:shadow-xl ${
                  plan.popular 
                    ? 'border-2 border-blue-500 relative scale-105 shadow-lg' 
                    : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-lg font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild
                    className={`w-full transition-all ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg' 
                        : ''
                    }`}
                  >
                    <Link href="/dashboard">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <LogoSmall />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Transform your Instagram engagement with automated responses and AI-powered messaging.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Zenus. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </main>
    </>
  )
}
