'use client'
import { useContentAnalysis } from '@/hooks/use-content-analysis'
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react'
import React from 'react'

const ContentInsights = () => {
  const { data, isLoading } = useContentAnalysis()

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-700/30 rounded w-1/3" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-gray-700/30 rounded" />
          <div className="h-32 bg-gray-700/30 rounded" />
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-white mb-2">Content Insights</h2>
        <p className="text-text-secondary text-sm">Key insights to improve your content strategy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-background-90 p-5 rounded-lg border border-in-active/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-light-blue/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-light-blue" />
            </div>
            <h3 className="text-lg font-medium text-white">Performance Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Average Engagement</span>
              <span className="text-white font-medium">{data.avgEngagement.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Total Posts Analyzed</span>
              <span className="text-white font-medium">{data.totalPosts}</span>
            </div>
            {data.bestPerformingPost && (
              <div className="pt-3 border-t border-in-active/50">
                <p className="text-sm text-text-secondary mb-1">Best Performing Post</p>
                <p className="text-sm text-white line-clamp-2">
                  {data.bestPerformingPost.caption?.substring(0, 80) || 'No caption'}
                  {data.bestPerformingPost.caption && data.bestPerformingPost.caption.length > 80 && '...'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-background-90 p-5 rounded-lg border border-in-active/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-keyword-green/20 rounded-lg">
              <Calendar className="h-5 w-5 text-keyword-green" />
            </div>
            <h3 className="text-lg font-medium text-white">Posting Strategy</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm mb-2">Best Time to Post</p>
              <p className="text-white font-medium">{data.bestTimeToPost}</p>
            </div>
            {data.contentThemes.length > 0 && (
              <div className="pt-3 border-t border-in-active/50">
                <p className="text-sm text-text-secondary mb-2">Top Themes</p>
                <div className="flex flex-wrap gap-2">
                  {data.contentThemes.slice(0, 3).map((theme, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-light-blue/20 text-light-blue rounded text-xs"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {data.recommendations.length > 0 && (
        <div className="bg-background-90 p-5 rounded-lg border border-in-active/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.recommendations.slice(0, 4).map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-background-80 rounded-lg"
              >
                <span className="text-light-blue font-bold">{index + 1}.</span>
                <p className="text-sm text-text-secondary">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentInsights

