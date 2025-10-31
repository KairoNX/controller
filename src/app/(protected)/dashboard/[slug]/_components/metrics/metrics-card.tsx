'use client'
import { useQueryAutomations } from '@/hooks/user-queries'
import { MessageCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'

type Props = {}

const MetricsCard = (props: Props) => {
  const { data } = useQueryAutomations()
  const comments = data?.data.reduce((current, next) => {
    return current + next.listener?.commentCount!
  }, 0)

  const dms = data?.data?.reduce((current, next) => {
    return current + next.listener?.dmCount!
  }, 0)

  const [animatedComments, setAnimatedComments] = useState(0)
  const [animatedDms, setAnimatedDms] = useState(0)
  const [animatedCommentPercent, setAnimatedCommentPercent] = useState(0)
  const [animatedDmPercent, setAnimatedDmPercent] = useState(0)

  useEffect(() => {
    // Animate numbers on mount
    const duration = 1500
    const steps = 60
    const stepTime = duration / steps
    
    // Animate comments
    let commentStep = 0
    const commentInterval = setInterval(() => {
      commentStep++
      const progress = commentStep / steps
      setAnimatedComments(Math.floor(comments * progress))
      setAnimatedCommentPercent(Math.floor(100 * progress))
      if (commentStep >= steps) clearInterval(commentInterval)
    }, stepTime)

    // Animate DMs
    let dmStep = 0
    const dmInterval = setInterval(() => {
      dmStep++
      const progress = dmStep / steps
      setAnimatedDms(Math.floor(dms * progress))
      setAnimatedDmPercent(Math.floor(100 * progress))
      if (dmStep >= steps) clearInterval(dmInterval)
    }, stepTime)

    return () => {
      clearInterval(commentInterval)
      clearInterval(dmInterval)
    }
  }, [comments, dms])

  return (
    <div className="h-full flex lg:flex-row flex-col gap-5 items-end">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="group relative p-5 border-[1px] border-in-active/50 flex flex-col gap-y-20 rounded-xl w-full lg:w-6/12 transition-all duration-300 hover:border-light-blue/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] cursor-pointer overflow-hidden"
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {i === 1 ? (
            <div className="z-10">
              <h2 className="text-3xl text-white font-bold transition-all duration-300 group-hover:scale-105">Comments</h2>
              <p className="text-sm text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">On your posts</p>
            </div>
          ) : (
            <div className="flex flex-col z-10">
              <h2 className="text-3xl text-white font-bold transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                Direct Messages
                <MessageCircle className="h-6 w-6 text-light-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h2>
              <p className="text-sm text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">On your account</p>
            </div>
          )}
          {i === 1 ? (
            <div className="z-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                {animatedCommentPercent}%
              </h3>
              <p className="text-sm text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">
                {animatedComments} out of {comments || 0} comments replied
              </p>
            </div>
          ) : (
            <div className="z-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                {animatedDmPercent}%
              </h3>
              <p className="text-sm text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">
                {animatedDms} out of {dms || 0} DMs replied
              </p>
            </div>
          )}
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      ))}
    </div>
  )
}

export default MetricsCard
