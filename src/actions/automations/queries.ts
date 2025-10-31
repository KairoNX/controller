'use server'

import { client } from '@/lib/prisma'
import { v4 } from 'uuid'

export const createAutomation = async (clerkId: string, id?: string) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {
          ...(id && { id }),
        },
      },
    },
  })
}

export const getAutomations = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      automations: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          keywords: true,
          listener: true,
        },
      },
    },
  })
}

export const findAutomation = async (id: string) => {
  return await client.automation.findUnique({
    where: {
      id,
    },
    include: {
      keywords: true,
      trigger: true,
      posts: true,
      listener: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  })
}

export const updateAutomation = async (
  id: string,
  update: {
    name?: string
    active?: boolean
  }
) => {
  return await client.automation.update({
    where: { id },
    data: {
      name: update.name,
      active: update.active,
    },
  })
}

export const addListener = async (
  automationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string
) => {
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      listener: {
        create: {
          listener,
          prompt,
          commentReply: reply,
        },
      },
    },
  })
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await client.automation.update({
      where: { id: automationId },
      data: {
        trigger: {
          createMany: {
            data: [{ type: trigger[0] }, { type: trigger[1] }],
          },
        },
      },
    })
  }
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      trigger: {
        create: {
          type: trigger[0],
        },
      },
    },
  })
}

export const addKeyWord = async (automationId: string, keyword: string) => {
  return client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      keywords: {
        create: {
          word: keyword,
        },
      },
    },
  })
}

export const deleteKeywordQuery = async (id: string) => {
  return client.keyword.delete({
    where: { id },
  })
}

export const addPost = async (
  autmationId: string,
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }[]
) => {
  return await client.automation.update({
    where: {
      id: autmationId,
    },
    data: {
      posts: {
        createMany: {
          data: posts,
        },
      },
    },
  })
}

export const cloneAutomation = async (automationId: string, userId: string) => {
  // Fetch the original automation with all related data
  const original = await client.automation.findUnique({
    where: { id: automationId },
    include: {
      keywords: true,
      trigger: true,
      posts: true,
      listener: true,
    },
  })

  if (!original) {
    return null
  }

  // Create new automation with cloned data
  const cloned = await client.automation.create({
    data: {
      name: `${original.name} (Copy)`,
      active: false, // Clone starts as inactive for safety
      userId: userId,
      // Clone triggers
      trigger: {
        createMany: {
          data: original.trigger.map((t) => ({
            type: t.type,
          })),
        },
      },
      // Clone keywords
      keywords: {
        createMany: {
          data: original.keywords.map((k) => ({
            word: k.word,
          })),
        },
      },
      // Clone listener if exists
      ...(original.listener && {
        listener: {
          create: {
            listener: original.listener.listener,
            prompt: original.listener.prompt,
            commentReply: original.listener.commentReply,
          },
        },
      }),
      // Clone posts
      posts: {
        createMany: {
          data: original.posts.map((p) => ({
            postid: p.postid,
            caption: p.caption,
            media: p.media,
            mediaType: p.mediaType,
          })),
        },
      },
    },
    include: {
      keywords: true,
      listener: true,
      trigger: true,
      posts: true,
    },
  })

  return cloned
}
