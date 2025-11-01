'use client'
import { useTopPosts } from '@/hooks/use-content-analysis'
import { Heart, MessageCircle, Image, Video, TrendingUp } from 'lucide-react'
import React from 'react'

const TopPosts = () => {
  const { data: posts, isLoading, error } = useTopPosts(5)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-24 bg-gray-700/30 rounded" />
        ))}
      </div>
    )
  }

  if (error || !posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">No posts available</p>
        <p className="text-text-secondary text-sm mt-2">
          Connect your Instagram account to analyze content
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const engagement = (post.likes_count || 0) + (post.comments_count || 0)
        const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REELS'

        return (
          <div
            key={post.id}
            className="bg-background-90 p-4 rounded-lg border border-in-active/50 hover:border-light-blue/50 transition-colors"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                {isVideo ? (
                  <Video className="h-8 w-8 text-gray-600 m-auto mt-4" />
                ) : (
                  <Image className="h-8 w-8 text-gray-600 m-auto mt-4" />
                )}
                <div className="absolute top-1 right-1">
                  {isVideo ? (
                    <span className="text-xs bg-purple-500 text-white px-1 rounded">VIDEO</span>
                  ) : (
                    <span className="text-xs bg-blue-500 text-white px-1 rounded">IMAGE</span>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm text-white font-medium line-clamp-2">
                    {post.caption?.substring(0, 100) || 'No caption'}
                    {post.caption && post.caption.length > 100 && '...'}
                  </p>
                  <div className="flex items-center gap-1 text-keyword-green flex-shrink-0">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">{engagement}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.comments_count || 0}</span>
                  </div>
                  <span className="text-text-secondary/60">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopPosts

