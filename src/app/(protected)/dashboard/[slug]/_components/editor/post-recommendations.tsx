'use client'
import { useContentAnalysis } from '@/hooks/use-content-analysis'
import { Lightbulb, AlertCircle, CheckCircle, Info } from 'lucide-react'
import React from 'react'

const PostRecommendations = () => {
  const { data, isLoading, error } = useContentAnalysis()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-32 bg-gray-700/30 rounded" />
        ))}
      </div>
    )
  }

  if (error || !data || !data.recommendations || data.recommendations.length === 0) {
    return (
      <div className="text-center py-10">
        <Lightbulb className="h-12 w-12 text-text-secondary/50 mx-auto mb-4" />
        <p className="text-text-secondary">No recommendations available</p>
        <p className="text-text-secondary text-sm mt-2">
          {error?.message || 'Start posting content to get AI recommendations'}
        </p>
      </div>
    )
  }

  const getIcon = (index: number) => {
    const icons = [CheckCircle, AlertCircle, Info]
    return icons[index % icons.length]
  }


  return (
    <div className="space-y-4">
      {data.recommendations.map((recommendation, index) => {
        const Icon = getIcon(index)
        return (
          <div
            key={index}
            className="bg-background-90 p-4 rounded-lg border border-in-active/50 hover:border-light-blue/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-light-blue/20 rounded-lg flex-shrink-0">
                <Icon className="h-5 w-5 text-light-blue" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium mb-1">{recommendation}</p>
                <p className="text-text-secondary text-sm">
                  AI-generated recommendation based on your content performance
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostRecommendations

