import { z } from 'zod'
import {
  createAutomations,
  deleteAutomation,
  deleteKeyword,
  saveKeyword,
  saveListener,
  savePosts,
  saveTrigger,
  updateAutomationName,
  updateAISettings,
} from '@/actions/automations'
import { useMutationData } from './use-mutation-data'
import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import useZodForm from './use-zod-form'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { TRIGGER } from '@/redux/slices/automation'

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ['create-automation'],
    () => createAutomations(id),
    'user-automations'
  )

  return { isPending, mutate }
}

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = useCallback(() => setEdit(false), [])

  const { isPending, mutate } = useMutationData(
    ['update-automation'],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    'automation-info',
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mutate, disableEdit])

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}

export const useListener = (id: string) => {
  const [listener, setListener] = useState<'MESSAGE' | 'SMARTAI' | null>(null)

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string().optional(),
    // AI Settings (only for SMARTAI)
    aiTone: z.enum(['PROFESSIONAL', 'FRIENDLY', 'CASUAL', 'ENTHUSIASTIC']).optional(),
    aiMaxLength: z.number().min(1).max(5).optional(),
    aiUseEmojis: z.boolean().optional(),
    aiResponseStyle: z.enum(['CONCISE', 'DETAILED', 'BALANCED']).optional(),
  })

  const { isPending, mutate } = useMutationData(
    ['create-lister'],
    (data: {
      prompt: string
      reply?: string
      aiTone?: 'PROFESSIONAL' | 'FRIENDLY' | 'CASUAL' | 'ENTHUSIASTIC'
      aiMaxLength?: number
      aiUseEmojis?: boolean
      aiResponseStyle?: 'CONCISE' | 'DETAILED' | 'BALANCED'
    }) => {
      const { prompt, reply, aiTone, aiMaxLength, aiUseEmojis, aiResponseStyle } = data
      return saveListener(
        id,
        listener || 'MESSAGE',
        prompt,
        reply,
        listener === 'SMARTAI'
          ? {
              tone: aiTone,
              maxLength: aiMaxLength,
              useEmojis: aiUseEmojis,
              responseStyle: aiResponseStyle,
            }
          : undefined
      )
    },
    'automation-info'
  )

  const { errors, onFormSubmit, register, reset, watch, setValue } = useZodForm(
    promptSchema,
    mutate
  )

  const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setListener(type)
  return { onSetListener, register, onFormSubmit, listener, isPending, watch, setValue }
}

export const useAISettings = (automationId: string) => {
  const { isPending, mutate } = useMutationData(
    ['update-ai-settings'],
    (data: {
      tone?: 'PROFESSIONAL' | 'FRIENDLY' | 'CASUAL' | 'ENTHUSIASTIC'
      maxLength?: number
      useEmojis?: boolean
      responseStyle?: 'CONCISE' | 'DETAILED' | 'BALANCED'
    }) =>
      updateAISettings(automationId, {
        tone: data.tone,
        maxLength: data.maxLength,
        useEmojis: data.useEmojis,
        responseStyle: data.responseStyle,
      }),
    'automation-info'
  )

  return { isPending, mutate }
}

export const useTriggers = (id: string) => {
  const types = useAppSelector((state) => state.AutmationReducer.trigger?.types)

  const dispatch: AppDispatch = useDispatch()

  const onSetTrigger = (type: 'COMMENT' | 'DM') =>
    dispatch(TRIGGER({ trigger: { type } }))

  const { isPending, mutate } = useMutationData(
    ['add-trigger'],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    'automation-info'
  )

  const onSaveTrigger = () => mutate({ types })
  return { types, onSetTrigger, onSaveTrigger, isPending }
}

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState('')
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value)

  const { mutate } = useMutationData(
    ['add-keyword'],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    'automation-info',
    () => setKeyword('')
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ keyword })
      setKeyword('')
    }
  }

  const { mutate: deleteMutation } = useMutationData(
    ['delete-keyword'],
    (data: { id: string }) => deleteKeyword(data.id),
    'automation-info'
  )

  return { keyword, onValueChange, onKeyPress, deleteMutation }
}

export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postid: string
      caption?: string
      media: string
      mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
  >([])

  const onSelectPost = (post: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postid === post.postid)) {
        return prevItems.filter((item) => item.postid !== post.postid)
      } else {
        return [...prevItems, post]
      }
    })
  }

  const { mutate, isPending } = useMutationData(
    ['attach-posts'],
    () => savePosts(id, posts),
    'automation-info',
    () => setPosts([])
  )
  return { posts, onSelectPost, mutate, isPending }
}

export const useDeleteAutomation = () => {
  const { isPending, mutate } = useMutationData(
    ['delete-automation'],
    (id: string) => deleteAutomation(id),
    'user-automations'
  )

  return { isPending, mutate }
}
