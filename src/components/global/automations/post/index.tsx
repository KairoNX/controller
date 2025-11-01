import { useAutomationPosts } from '@/hooks/use-automations'
import { useQueryAutomationPosts } from '@/hooks/user-queries'
import React from 'react'
import TriggerButton from '../trigger-button'
import { InstagramPostProps } from '@/types/posts.type'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
  id: string
}

const PostButton = ({ id }: Props) => {
  const { data, isLoading, isError } = useQueryAutomationPosts()
  const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)

  // Check if we have posts data
  const postsData = data?.status === 200 && data?.data?.data && Array.isArray(data.data.data) ? data.data.data : []
  const hasPosts = postsData.length > 0

  return (
    <TriggerButton label="Attach a post">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader state={true}>Loading posts...</Loader>
        </div>
      ) : isError || !data ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-text-secondary text-center mb-2">Error loading posts</p>
          <p className="text-text-secondary/70 text-sm text-center">
            {data?.status === 401 
              ? 'Please reconnect your Instagram account'
              : data?.status === 404
              ? 'No Instagram integration found. Please connect your account.'
              : 'Please try again later'}
          </p>
        </div>
      ) : hasPosts ? (
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-wrap w-full gap-3">
            {postsData.map((post: InstagramPostProps) => (
              <div
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                key={post.id}
                onClick={() =>
                  onSelectPost({
                    postid: post.id,
                    media: post.media_url,
                    mediaType: post.media_type,
                    caption: post.caption,
                  })
                }
              >
                {posts.find((p) => p.postid === post.id) && (
                  <CheckCircle
                    fill="white"
                    stroke="black"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  />
                )}
                {post.media_type === 'VIDEO' ? (
                  <video
                    className={cn(
                      'w-full h-full object-cover hover:opacity-75 transition duration-100',
                      posts.find((p) => p.postid === post.id) && 'opacity-75'
                    )}
                    src={post.media_url}
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    fill
                    sizes="100vw"
                    src={post.media_url}
                    alt="post image"
                    className={cn(
                      'hover:opacity-75 transition duration-100 object-cover',
                      posts.find((p) => p.postid === post.id) && 'opacity-75'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            onClick={mutate}
            disabled={posts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-text-secondary text-center mb-2">No posts found!</p>
          <p className="text-text-secondary/70 text-sm text-center">
            Make sure you have posts on your Instagram account
          </p>
        </div>
      )}
    </TriggerButton>
  )
}

export default PostButton
