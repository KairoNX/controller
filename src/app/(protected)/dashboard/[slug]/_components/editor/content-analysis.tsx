'use client'
import { useContentAnalysis } from '@/hooks/use-content-analysis'
import { TrendingUp, Clock, Lightbulb, Hash } from 'lucide-react'
import React from 'react'

const ContentAnalysis = () => {
  const { data, isLoading, error } = useContentAnalysis()

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-700/30 rounded w-1/3" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-700/30 rounded" />
          <div className="h-24 bg-gray-700/30 rounded" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">Unable to load content analysis</p>
        <p className="text-text-secondary text-sm mt-2">{error?.message || 'No data available'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-white mb-2">Content Overview</h2>
        <p className="text-text-secondary text-sm">AI analysis of your Instagram content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background-90 p-4 rounded-lg border border-in-active/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-text-secondary">Total Posts</p>
            <TrendingUp className="h-4 w-4 text-light-blue" />
          </div>
          <p className="text-2xl font-bold text-white">{data.totalPosts}</p>
        </div>

        <div className="bg-background-90 p-4 rounded-lg border border-in-active/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-text-secondary">Avg Engagement</p>
            <TrendingUp className="h-4 w-4 text-keyword-green" />
          </div>
          <p className="text-2xl font-bold text-white">{data.avgEngagement.toLocaleString()}</p>
        </div>

        <div className="bg-background-90 p-4 rounded-lg border border-in-active/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-text-secondary">Best Time</p>
            <Clock className="h-4 w-4 text-light-blue" />
          </div>
          <p className="text-sm font-medium text-white">{data.bestTimeToPost}</p>
        </div>

        <div className="bg-background-90 p-4 rounded-lg border border-in-active/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-text-secondary">Content Themes</p>
            <Hash className="h-4 w-4 text-light-blue" />
          </div>
          <p className="text-sm font-medium text-white">
            {data.contentThemes.length} identified
          </p>
        </div>
      </div>

      {data.contentThemes.length > 0 && (
        <div className="bg-background-90 p-4 rounded-lg border border-in-active/50">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-4 w-4 text-light-blue" />
            <h3 className="text-sm font-medium text-white">Content Themes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.contentThemes.map((theme, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-light-blue/20 text-light-blue rounded-full text-xs"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentAnalysis

