'use client'
import React from 'react'
import { HelpDuoToneBlue } from '@/icons'
import { 
  Message, 
  FileText, 
  VideoRecorder, 
  Globe,
  Mail,
  MessageSquare
} from 'lucide-react'

type Props = {}

const Page = (props: Props) => {
  const faqItems = [
    {
      question: "How do I create an automation?",
      answer: "Navigate to the Automations page and click the 'Create Automation' button. You can set up triggers, conditions, and actions to automate your workflow."
    },
    {
      question: "What are tags used for?",
      answer: "Tags help you organize and categorize your automations. You can assign tags like 'Yoka', 'Bobo', or 'Alex' to group related automations together."
    },
    {
      question: "How do integrations work?",
      answer: "Integrations allow you to connect your app with external services and platforms. Visit the Integrations page to connect your preferred services."
    },
    {
      question: "Can I duplicate an automation?",
      answer: "Yes! Click the copy icon on any automation card to create a duplicate. This is useful when you want to create similar automations with minor variations."
    },
    {
      question: "What's the difference between Free and Smart AI plans?",
      answer: "The Free Plan includes basic automation features, while the Smart AI Plan unlocks AI-powered responses, advanced analytics, priority support, and custom branding."
    },
    {
      question: "How do I activate an automation?",
      answer: "Once you've created your automation, you can activate it using the activation button. Activated automations will run automatically based on your configured triggers."
    }
  ]

  const helpSections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      action: "View Docs"
    },
    {
      icon: <VideoRecorder className="w-6 h-6" />,
      title: "Video Tutorials",
      description: "Learn with step-by-step video guides",
      action: "Watch Videos"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Community Forum",
      description: "Connect with other users and get help",
      action: "Join Forum"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Support",
      description: "Get in touch with our support team",
      action: "Contact Us"
    }
  ]

  return (
    <div className="flex flex-col gap-y-10">
      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {helpSections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-background-80 border-[1px] border-in-active hover:border-light-blue/50 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-x-3 mb-4 text-light-blue group-hover:text-light-blue/80 transition-colors">
              {section.icon}
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              {section.description}
            </p>
            <button className="text-light-blue text-sm font-medium hover:underline">
              {section.action} →
            </button>
          </div>
        ))}
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

      {/* Getting Started Section */}
      <div className="rounded-xl bg-background-80 border-[1px] border-in-active p-6 lg:p-10">
        <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue font-bold">
                1
              </div>
              <h3 className="text-lg font-medium">Create Your First Automation</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Start by creating an automation on the Automations page. Define when it should trigger and what actions to take.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue font-bold">
                2
              </div>
              <h3 className="text-lg font-medium">Set Up Integrations</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Connect your favorite services and platforms through the Integrations page to extend your automation capabilities.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue font-bold">
                3
              </div>
              <h3 className="text-lg font-medium">Organize with Tags</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Use tags to organize your automations. This makes it easier to find and manage related automations.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#1D1D1D] border-[1px] border-in-active/50">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue font-bold">
                4
              </div>
              <h3 className="text-lg font-medium">Activate & Monitor</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Once your automation is ready, activate it and monitor its performance from your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="rounded-xl bg-gradient-to-br from-light-blue/10 to-purple-500/10 border-[1px] border-light-blue/20 p-6 lg:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
            <p className="text-text-secondary">
              Our support team is here to assist you. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full bg-light-blue hover:bg-light-blue/90 text-white font-medium transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page

