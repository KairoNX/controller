import { useListener } from '@/hooks/use-automations'
import React, { useState, useEffect } from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../../subscription-plan'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Loader from '../../loader'
import { X } from 'lucide-react'
import { useQueryAutomation } from '@/hooks/user-queries'

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
    watch,
    setValue,
  } = useListener(id)

  const { data: automationData } = useQueryAutomation(id)
  
  const aiTone = watch('aiTone') || 'FRIENDLY'
  const aiMaxLength = watch('aiMaxLength') || 2
  const aiUseEmojis = watch('aiUseEmojis') ?? true
  const aiResponseStyle = watch('aiResponseStyle') || 'BALANCED'
  
  // State for DM buttons
  const [buttons, setButtons] = useState<{ title: string; url: string }[]>([])

  // Load existing buttons when automation data is available
  useEffect(() => {
    if (automationData?.data?.listener?.buttons) {
      const existingButtons = automationData.data.listener.buttons as { title: string; url: string }[]
      if (Array.isArray(existingButtons) && existingButtons.length > 0) {
        setButtons(existingButtons)
      }
    }
  }, [automationData?.data?.listener?.buttons])

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === 'SMARTAI' ? (
            <SubscriptionPlan
              key={listener.type}
              type="PRO"
            >
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                    : 'bg-background-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                  : 'bg-background-80',
                'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-y-2"
        >
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : 'Add a message you want send to your customers'
            }
            {...register('prompt')}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register('reply')}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />

          {/* DM Buttons - Show when listener is selected */}
          {Listener && (
            <div className="mt-4 p-4 rounded-xl bg-background-80/50 border border-in-active/30 flex flex-col gap-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-white/90">DM Buttons (Optional)</Label>
                {buttons.length < 3 && (
                  <Button
                    type="button"
                    onClick={() => setButtons([...buttons, { title: '', url: '' }])}
                    className="h-8 px-3 text-xs bg-light-blue/20 text-light-blue hover:bg-light-blue/30 border-none"
                  >
                    + Add Button
                  </Button>
                )}
              </div>
              <p className="text-xs text-text-secondary">
                Add buttons that appear inside Instagram DMs (max 3, up to 20 chars each)
              </p>
              
              {buttons.map((button, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Button text (max 20 chars)"
                    value={button.title}
                    onChange={(e) => {
                      const newButtons = [...buttons]
                      newButtons[index].title = e.target.value.slice(0, 20)
                      setButtons(newButtons)
                    }}
                    className="bg-background-80 flex-1 border-in-active/30"
                    maxLength={20}
                  />
                  <Input
                    placeholder="https://example.com"
                    value={button.url}
                    onChange={(e) => {
                      const newButtons = [...buttons]
                      newButtons[index].url = e.target.value
                      setButtons(newButtons)
                    }}
                    className="bg-background-80 flex-1 border-in-active/30"
                    type="url"
                  />
                  <Button
                    type="button"
                    onClick={() => setButtons(buttons.filter((_, i) => i !== index))}
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {/* Hidden input to include buttons in form */}
              <input
                type="hidden"
                {...register('buttons')}
                value={JSON.stringify(buttons.filter(b => b.title && b.url))}
              />
            </div>
          )}

          {/* AI Settings - Only show for SMARTAI */}
          {Listener === 'SMARTAI' && (
            <div className="mt-4 p-4 rounded-xl bg-background-80/50 border border-in-active/30 flex flex-col gap-y-4">
              <h3 className="text-sm font-medium text-white/90">AI Response Settings</h3>
              
              {/* Tone Selector */}
              <div className="flex flex-col gap-y-2">
                <Label className="text-xs text-text-secondary">Response Tone</Label>
                <Select
                  value={aiTone}
                  onValueChange={(value) => setValue('aiTone', value as any)}
                >
                  <SelectTrigger className="bg-background-80 border-in-active/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                    <SelectItem value="FRIENDLY">Friendly</SelectItem>
                    <SelectItem value="CASUAL">Casual</SelectItem>
                    <SelectItem value="ENTHUSIASTIC">Enthusiastic</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register('aiTone')}
                  value={aiTone}
                />
              </div>

              {/* Max Length Slider */}
              <div className="flex flex-col gap-y-2">
                <Label className="text-xs text-text-secondary">
                  Max Length: {aiMaxLength} sentence{aiMaxLength > 1 ? 's' : ''}
                </Label>
                <Slider
                  value={[aiMaxLength]}
                  onValueChange={(value) => setValue('aiMaxLength', value[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <input
                  type="hidden"
                  {...register('aiMaxLength', { valueAsNumber: true })}
                  value={aiMaxLength}
                />
              </div>

              {/* Response Style */}
              <div className="flex flex-col gap-y-2">
                <Label className="text-xs text-text-secondary">Response Style</Label>
                <Select
                  value={aiResponseStyle}
                  onValueChange={(value) => setValue('aiResponseStyle', value as any)}
                >
                  <SelectTrigger className="bg-background-80 border-in-active/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONCISE">Concise</SelectItem>
                    <SelectItem value="BALANCED">Balanced</SelectItem>
                    <SelectItem value="DETAILED">Detailed</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register('aiResponseStyle')}
                  value={aiResponseStyle}
                />
              </div>

              {/* Emojis Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-xs text-text-secondary">Use Emojis</Label>
                <div className="flex items-center gap-x-2">
                  <Switch
                    checked={aiUseEmojis}
                    onCheckedChange={(checked) => setValue('aiUseEmojis', checked)}
                  />
                  <input
                    type="hidden"
                    {...register('aiUseEmojis')}
                    checked={aiUseEmojis}
                  />
                </div>
              </div>
            </div>
          )}

          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction
