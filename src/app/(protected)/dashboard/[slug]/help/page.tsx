'use client'
import React from 'react'
import { HelpDuoToneBlue } from '@/icons'
import { 
  FileText, 
  Video, 
  Mail,
  MessageSquare,
  Sparkles,
  Zap,
  BarChart3,
  Settings,
  Instagram,
  MessageCircle,
  Tag,
  Copy,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

type Props = {}

const Page = (props: Props) => {
  const faqItems = [
    {
      question: "How do I create an automation?",
      answer: "Go to Automations → Click 'Create Automation' → Choose a trigger (Comment or DM with keyword) → Set up keywords → Select an action (Send message or use Smart AI) → Save. Your automation is now ready to respond to Instagram interactions."
    },
    {
      question: "What are keywords and how do they work?",
      answer: "Keywords are words or phrases that trigger your automation. When someone comments on your post or sends a DM containing your keyword, Zenus automatically responds. For example, use keywords like 'price', 'pricing', 'cost' to answer pricing questions instantly."
    },
    {
      question: "How do I connect my Instagram account?",
      answer: "Navigate to Integrations → Click 'Connect' on Instagram → Authorize Zenus to access your account. The connection is secure via OAuth 2.0. Once connected, Zenus can monitor your posts and DMs in real-time."
    },
    {
      question: "Can I duplicate an automation?",
      answer: "Yes! Click the copy icon (two overlapping squares) on any automation card to create a duplicate. This is perfect when you want similar automations with different keywords or settings."
    },
    {
      question: "What's the difference between Free and Smart AI plans?",
      answer: "Free Plan: Basic DM/comment automation with custom messages. Smart AI Plan ($99/month): AI-powered responses that adapt to context, advanced analytics with goal tracking, performance alerts, ROI calculator, email reports, DM reply buttons, and priority support."
    },
    {
      question: "How do Smart AI automations work?",
      answer: "Smart AI uses OpenAI to generate contextually relevant responses. Set a prompt describing your project, choose tone (Professional, Friendly, Casual, Enthusiastic), adjust length and style, and AI responds naturally to each interaction based on the conversation context."
    },
    {
      question: "Can I attach specific posts to an automation?",
      answer: "Yes! For comment automations, you can select specific posts where the automation should trigger. Click 'Attach Post' and choose from your recent Instagram posts. Great for targeting specific products or campaigns."
    },
    {
      question: "What are DM buttons?",
      answer: "DM buttons (Smart AI Plan only) are quick reply buttons that appear inside Instagram messages. Add up to 3 buttons (20 chars each) with links to help customers take action faster - like visiting your website or purchasing."
    },
    {
      question: "How do I track my automation performance?",
      answer: "Visit the Analytics page to see total responses, engagement trends, average response time, keyword performance, and automation effectiveness. Smart AI users get advanced metrics, goal tracking, ROI calculations, and email reports."
    },
    {
      question: "What are performance alerts?",
      answer: "Performance alerts (Smart AI Plan) notify you when your automation metrics drop or need attention. Get warnings for low engagement, automation failures, or missed opportunities - perfect for staying on top of your Instagram presence."
    },
    {
      question: "How do I upgrade to Smart AI?",
      answer: "Click 'Upgrade' in the sidebar or go to Settings → Billing. The Smart AI plan is $99/month and unlocks AI responses, advanced analytics, goal tracking, alerts, email reports, and more. Cancel anytime."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! Zenus uses enterprise-grade security with OAuth 2.0, encrypted data storage, secure webhook verification, and compliance with Instagram's best practices. Your account credentials are never stored."
    }
  ]

  const helpSections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Documentation",
      description: "Read comprehensive guides and best practices",
      action: "Coming Soon"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Tutorials",
      description: "Watch step-by-step walkthrough videos",
      action: "Coming Soon"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Community",
      description: "Join our Discord for tips and support",
      action: "Join Discord"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Support",
      description: "Email us at support@zenus.space",
      action: "Email Us"
    }
  ]

  const gettingStartedSteps = [
    {
      number: 1,
      icon: <Instagram className="w-5 h-5" />,
      title: "Connect Instagram",
      description: "Link your Instagram account via OAuth in the Integrations page. Authorize Zenus to monitor your posts and DMs securely."
    },
    {
      number: 2,
      icon: <Sparkles className="w-5 h-5" />,
      title: "Create Your First Automation",
      description: "Go to Automations → Create Automation → Choose 'Comment' or 'DM' trigger → Add keywords like 'price', 'menu', 'info' → Select your action."
    },
    {
      number: 3,
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Configure Your Response",
      description: "For Standard: Write your message. For Smart AI: Describe your project, set tone/style, optionally add DM buttons for quick actions."
    },
    {
      number: 4,
      icon: <Tag className="w-5 h-5" />,
      title: "Add Keywords",
      description: "Think of what customers ask most: 'pricing', 'hours', 'location', 'product', etc. These words will trigger your automatic response."
    },
    {
      number: 5,
      icon: <Target className="w-5 h-5" />,
      title: "Attach Posts (Optional)",
      description: "For comment automations, select specific posts where the automation should trigger. Great for promoting products or campaigns."
    },
    {
      number: 6,
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Monitor & Optimize",
      description: "Check Analytics to see performance. Track which keywords work best, response rates, engagement trends, and ROI. Improve over time!"
    }
  ]

  const featureHighlights = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Instant Responses",
      description: "Reply to comments and DMs automatically with keywords in milliseconds"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "Smart AI",
      description: "AI-powered responses that adapt to context and conversation flow"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      title: "Advanced Analytics",
      description: "Track performance, set goals, calculate ROI, and get insights"
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-blue-400" />,
      title: "Performance Alerts",
      description: "Get notified when metrics drop or opportunities arise"
    }
  ]

  return (
    <div className="flex flex-col gap-y-10">
      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {helpSections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-background-80 border-[1px] border-in-active hover:border-light-blue/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-x-3 mb-4 text-light-blue group-hover:text-light-blue/80 transition-colors">
              {section.icon}
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              {section.description}
            </p>
            <span className="text-light-blue text-sm font-medium">
              {section.action}
            </span>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="rounded-xl bg-gradient-to-br from-light-blue/5 to-purple-500/5 border-[1px] border-in-active p-6">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Zenus?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureHighlights.map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="rounded-xl bg-background-80 border-[1px] border-in-active p-6 lg:p-10">
        <div className="flex items-center gap-x-3 mb-6">
          <Zap className="w-6 h-6 text-light-blue" />
          <h2 className="text-2xl font-semibold">Getting Started</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gettingStartedSteps.map((step) => (
            <div
              key={step.number}
              className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50 hover:border-light-blue/30 transition-all duration-300"
            >
              <div className="flex items-center gap-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue font-bold">
                  {step.number}
                </div>
                <div className="flex items-center gap-x-2 text-light-blue">
                  {step.icon}
                  <h3 className="text-lg font-medium">{step.title}</h3>
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-xl bg-background-80 border-[1px] border-in-active p-6 lg:p-10">
        <div className="flex items-center gap-x-3 mb-8">
          <HelpDuoToneBlue />
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        </div>
        
        <div className="flex flex-col gap-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50 hover:border-light-blue/30 transition-all duration-300"
            >
              <h3 className="text-lg font-medium mb-2 text-white">
                {item.question}
              </h3>
              <p className="text-text-secondary">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="rounded-xl bg-gradient-to-br from-light-blue/10 to-purple-500/10 border-[1px] border-light-blue/20 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
            <p className="text-text-secondary">
              Our support team is here to assist you. Reach out and we&#39;ll get back to you as soon as possible.
            </p>
          </div>
          <a
            href="mailto:support@zenus.space"
            className="px-6 py-3 rounded-full bg-light-blue hover:bg-light-blue/90 text-white font-medium transition-colors duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default Page

