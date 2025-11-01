'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Message = {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

const quickReplies = [
  '💰 Pricing information',
  '🚀 Getting started',
  '🤖 AI features',
  '📞 Contact support',
]

const getSmartResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase()
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('pay')) {
    return "Great question! 💰 We offer a Free plan to get started, and our Smart AI Plan is just $99/month with advanced features. Would you like to know more about what's included?"
  }
  
  if (msg.includes('start') || msg.includes('begin') || msg.includes('setup')) {
    return "Getting started is super easy! 🚀 Just click the 'Get Started Free' button, connect your Instagram account, and you'll be automating responses in minutes. Need a walkthrough?"
  }
  
  if (msg.includes('ai') || msg.includes('automation') || msg.includes('feature')) {
    return "Our AI features are amazing! 🤖 You get smart response generation, automated DM replies, comment automation, and advanced analytics. The AI learns from your style to create natural responses."
  }
  
  if (msg.includes('help') || msg.includes('support') || msg.includes('contact')) {
    return "I'm here to help! 📞 You can message us right here, or email us at support@zenus.space. Our response time is usually under 2 hours. What do you need help with?"
  }
  
  if (msg.includes('instagram') || msg.includes('ig') || msg.includes('connect')) {
    return "Connecting Instagram is simple! Just authorize the connection through your dashboard, and we'll handle the rest securely. Your data is always protected. 🔒"
  }
  
  if (msg.includes('thanks') || msg.includes('thank')) {
    return "You're very welcome! 😊 Is there anything else I can help you with today?"
  }
  
  return "Thanks for reaching out! Our team will get back to you shortly. In the meantime, feel free to explore our features or ask me anything else! 💙"
}

const CustomChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! Welcome to Zenus Support 😊 What can we help you with today?',
      sender: 'agent',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate agent response with typing delay
    const typingDelay = Math.min(messageText.length * 30 + 500, 2500)
    
    setTimeout(() => {
      setIsTyping(false)
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getSmartResponse(messageText),
        sender: 'agent',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
      
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    }, typingDelay)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <>
      {/* Chat Button with notification badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window with animations */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex h-[85vh] md:h-[600px] w-[calc(100vw-2rem)] md:w-[380px] lg:w-[400px] max-w-[400px] flex-col rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 p-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold">
                    <Sparkles className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-1">
                  Zenus Support
                  <Sparkles className="h-3 w-3" />
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                  Online • Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 transition-all hover:bg-white/20 hover:rotate-90 duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900"
          >
            <p className="text-center text-xs text-muted-foreground mb-4 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-2 mx-auto w-fit">
              💬 Ask us anything, or share your feedback
            </p>

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="mt-1.5 text-xs opacity-60 flex items-center gap-1">
                    {message.sender === 'agent' && <Sparkles className="h-3 w-3" />}
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 bg-slate-100 dark:bg-slate-800 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 1 && !isTyping && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-xs text-muted-foreground text-center mb-2">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-400 transition-all hover:scale-105 text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-white dark:bg-slate-900 p-4 rounded-b-2xl">
            <div className="flex items-center gap-2 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 focus-within:border-blue-500 transition-colors">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-2.5 text-white transition-all hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Powered by Zenus AI ✨
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomChatWidget

