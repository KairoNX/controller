import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, Sparkles, Zap, TrendingUp, ArrowRight, X, Star, MessageSquare, Clock, Users, Shield, Rocket } from 'lucide-react'
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
                <Link href="#comparison" className="transition-colors hover:text-white">
                  vs ManyChat
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
                  className="w-full sm:w-auto border-blue-700 text-blue-300 hover:bg-blue-900/80 hover:text-blue-100 transition-all"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Never miss a message with round-the-clock automated responses
              </p>
            </div>

            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Keywords</h3>
              <p className="text-muted-foreground">
                Trigger automations based on specific keywords or phrases
              </p>
            </div>

            <div className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Shield className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data stays secure with enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Zenus vs ManyChat
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg">
              See why creators and businesses choose Zenus for Instagram automation
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-6 font-semibold text-slate-900 dark:text-white">Feature</th>
                    <th className="text-center p-6 font-semibold text-blue-600 dark:text-blue-400">Zenus</th>
                    <th className="text-center p-6 font-semibold text-slate-600 dark:text-slate-400">ManyChat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Instagram Focus</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <X className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">AI-Powered Responses</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Free Plan Available</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Comment Automation</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <X className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Advanced Analytics</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Goal Tracking</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <X className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Conversation Memory (AI)</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Email Analytics Reports</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <X className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Keyword-Based Triggers</td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Multi-Platform Support</td>
                    <td className="p-6 text-center">
                      <span className="text-sm text-slate-500">Instagram Only</span>
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Pricing</td>
                    <td className="p-6 text-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">From $0/month</span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">From $15/month</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="p-6 font-medium text-slate-900 dark:text-white">Setup Complexity</td>
                    <td className="p-6 text-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">Simple & Fast</span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Steep Learning Curve</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg"
              >
                <Link href="/dashboard">
                  Try Zenus Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Loved by Creators & Businesses
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg">
              Join thousands of users growing their Instagram presence with Zenus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;Zenus has transformed how I engage with my followers. The AI responses are so natural that people can&apos;t even tell they&apos;re automated. My engagement rate increased by 300%!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Martinez</p>
                    <p className="text-sm text-muted-foreground">Fitness Influencer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;As a small business owner, I don&apos;t have time to respond to every DM. Zenus handles everything for me, and I&apos;m closing more sales than ever. The ROI is incredible!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">James Davidson</p>
                    <p className="text-sm text-muted-foreground">E-commerce Store</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;The analytics dashboard is a game-changer. I can finally see which automations are working and optimize my engagement strategy. This tool pays for itself!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    AK
                  </div>
                  <div>
                    <p className="font-semibold">Alex Kim</p>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Perfect For Every Use Case
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg">
              Whether you&apos;re a creator, influencer, or business owner, Zenus adapts to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="group p-6 hover:shadow-xl transition-all border-2 hover:border-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Influencers & Creators</h3>
                  <p className="text-muted-foreground mb-4">
                    Respond to every comment and DM automatically while maintaining your authentic voice with AI-powered responses.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Boost engagement rates
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Save hours daily on responses
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Turn followers into customers
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="group p-6 hover:shadow-xl transition-all border-2 hover:border-purple-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors shrink-0">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Businesses & Brands</h3>
                  <p className="text-muted-foreground mb-4">
                    Scale your customer support on Instagram with 24/7 automated responses that match your brand&apos;s tone.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Instant customer support
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Lead qualification automation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Track ROI with analytics
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="group p-6 hover:shadow-xl transition-all border-2 hover:border-green-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors shrink-0">
                  <Rocket className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Marketing Agencies</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage multiple client accounts with white-label features and comprehensive reporting tools.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Multi-account management
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Client analytics reports
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Scalable pricing models
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="group p-6 hover:shadow-xl transition-all border-2 hover:border-orange-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors shrink-0">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">E-commerce Stores</h3>
                  <p className="text-muted-foreground mb-4">
                    Convert Instagram DMs into sales with automated product recommendations and cart recovery.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Product inquiry automation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Cart abandonment recovery
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Sales conversion tracking
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Trusted & Secure
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg">
              Your data and privacy are our top priorities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-level encryption and secure OAuth connections to keep your Instagram account safe
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground">
                Reliable infrastructure ensuring your automations run 24/7 without interruption
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10K+ Active Users</h3>
              <p className="text-muted-foreground">
                Join a growing community of creators and businesses achieving Instagram success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-white bg-white/20 rounded-full border border-white/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Start Growing Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Amplify Your Instagram Presence?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of creators and businesses using Zenus to automate engagement and grow their following. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-xl"
              >
                <Link href="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-all"
              >
                <Link href="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
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
                <li><Link href="#comparison" className="hover:text-foreground transition-colors">vs ManyChat</Link></li>
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
