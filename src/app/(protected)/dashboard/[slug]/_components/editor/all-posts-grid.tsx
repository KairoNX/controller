'use client'
import { useAllPosts } from '@/hooks/use-content-analysis'
import { Heart, MessageCircle, Video, Image, TrendingUp, AlertCircle, RefreshCw, Instagram, X, Lightbulb } from 'lucide-react'
import React, { useState } from 'react'
import { usePostRecommendations } from '@/hooks/use-content-analysis'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const AllPostsGrid = () => {
  const { data: posts, isLoading, error, refetch } = useAllPosts()
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const pathname = usePathname()
  const basePath = pathname ? pathname.split('/').slice(0, 3).join('/') : '/dashboard'

  const { data: recommendations } = usePostRecommendations(
    selectedPost?.id || '',
    selectedPost || null
  )

  // Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="animate-pulse aspect-square bg-background-80 rounded-xl border border-in-active/30" />
        ))}
      </div>
    )
  }

  // Error State
  if (error) {
    const isTokenExpired = error.message?.includes('expired') || error.message?.includes('reconnect') || error.message?.includes('Session has expired')
    
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className={`p-6 ${isTokenExpired ? 'bg-orange-500/10 border-orange-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-xl`}>
            <AlertCircle className={`h-10 w-10 ${isTokenExpired ? 'text-orange-400' : 'text-red-400'} mx-auto mb-4`} />
            <h3 className="text-lg font-semibold text-white mb-2">
              {isTokenExpired ? 'Instagram Session Expired' : 'Failed to Load Posts'}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              {error.message || 'Unable to fetch your Instagram posts'}
            </p>
            {isTokenExpired ? (
              <Button
                onClick={() => window.location.href = `${basePath}/integrations`}
                className="bg-light-blue hover:bg-light-blue/90 text-white"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Reconnect Instagram
              </Button>
            ) : (
              <Button
                onClick={() => refetch()}
                className="bg-light-blue hover:bg-light-blue/90 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Empty State
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-6 bg-background-80 rounded-xl border border-in-active/50">
            <Instagram className="h-12 w-12 text-text-secondary/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Posts Found</h3>
            <p className="text-text-secondary text-sm mb-4">
              Connect your Instagram account or start posting to see your content
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="border-in-active/50 text-text-secondary hover:border-light-blue/50 hover:text-light-blue"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handlePostClick = (post: any) => {
    setSelectedPost(post)
    setShowDetails(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {posts.map((post) => {
          const engagement = (post.likes_count || 0) + (post.comments_count || 0)
          const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REELS'

          return (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-background-80 hover:scale-[1.02] transition-all duration-300 border border-in-active/50 hover:border-light-blue/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
              
              {/* Post Image/Video */}
              {post.media_url ? (
                <img
                  src={post.media_url}
                  alt={post.caption?.substring(0, 50) || 'Instagram post'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {isVideo ? (
                    <Video className="h-10 w-10 text-text-secondary/50" />
                  ) : (
                    <Image className="h-10 w-10 text-text-secondary/50" />
                  )}
                </div>
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-20">
                <div className="flex items-center justify-between">
                  {isVideo && (
                    <span className="px-2 py-1 bg-purple-500/90 text-white rounded-lg text-xs font-medium">
                      VIDEO
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-white text-sm font-medium">
                    <TrendingUp className="h-3 w-3 text-keyword-green" />
                    <span>{engagement}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span>{post.likes_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-light-blue" />
                    <span>{post.comments_count || 0}</span>
                  </div>
                </div>
              </div>

              {/* Engagement Badge */}
              {engagement > 0 && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-full z-30">
                  <span className="text-white text-xs font-medium">{engagement}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Post Details Modal */}
      {showDetails && selectedPost && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowDetails(false)
            setSelectedPost(null)
          }}
        >
          <div 
            className="bg-background-90 rounded-xl border border-in-active/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-background-90/95 backdrop-blur-sm border-b border-in-active/50 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Post Details</h3>
              <button
                onClick={() => {
                  setShowDetails(false)
                  setSelectedPost(null)
                }}
                className="p-2 hover:bg-background-80 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary hover:text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Left: Post Preview */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-background-80 border border-in-active/50">
                  {selectedPost.media_url ? (
                    <img
                      src={selectedPost.media_url}
                      alt={selectedPost.caption || 'Post'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedPost.media_type === 'VIDEO' || selectedPost.media_type === 'REELS' ? (
                        <Video className="h-16 w-16 text-text-secondary/50" />
                      ) : (
                        <Image className="h-16 w-16 text-text-secondary/50" />
                      )}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background-80 p-3 rounded-lg text-center border border-in-active/50">
                    <Heart className="h-4 w-4 text-red-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">{selectedPost.likes_count || 0}</p>
                    <p className="text-xs text-text-secondary">Likes</p>
                  </div>
                  <div className="bg-background-80 p-3 rounded-lg text-center border border-in-active/50">
                    <MessageCircle className="h-4 w-4 text-light-blue mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">{selectedPost.comments_count || 0}</p>
                    <p className="text-xs text-text-secondary">Comments</p>
                  </div>
                  <div className="bg-background-80 p-3 rounded-lg text-center border border-in-active/50">
                    <TrendingUp className="h-4 w-4 text-keyword-green mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">
                      {(selectedPost.likes_count || 0) + (selectedPost.comments_count || 0)}
                    </p>
                    <p className="text-xs text-text-secondary">Total</p>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Caption</h4>
                  <div className="bg-background-80 p-4 rounded-lg border border-in-active/50">
                    <p className="text-white whitespace-pre-wrap text-sm">
                      {selectedPost.caption || 'No caption'}
                    </p>
                  </div>
                </div>

                <div className="bg-background-80 p-3 rounded-lg border border-in-active/50">
                  <p className="text-xs text-text-secondary">
                    <span className="font-medium">Posted:</span> {new Date(selectedPost.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    <span className="font-medium">Type:</span> {selectedPost.media_type || 'Unknown'}
                  </p>
                </div>

                {/* AI Recommendations */}
                {recommendations && recommendations.length > 0 && (
                  <div className="bg-background-80 p-4 rounded-lg border border-light-blue/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-light-blue" />
                      <h4 className="text-sm font-medium text-white">AI Recommendations</h4>
                    </div>
                    <div className="space-y-2">
                      {recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="text-xs text-text-secondary bg-background-90 p-2 rounded border border-in-active/30">
                          <p className="font-medium text-white mb-1">{rec.title}</p>
                          <p>{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllPostsGrid
