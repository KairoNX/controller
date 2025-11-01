'use client'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAnalyticsMetrics } from '@/hooks/use-analytics'
import { format } from 'date-fns'
import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { AnalyticsTimeRange } from '@/actions/analytics/queries'

type Props = {}

const chartConfig = {
  dms: {
    label: 'DMs',
    color: 'hsl(217, 91%, 60%)',
  },
  comments: {
    label: 'Comments',
    color: 'hsl(280, 91%, 60%)',
  },
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
}

const Chart = (props: Props) => {
  const [range, setRange] = useState<AnalyticsTimeRange>('30d')
  const { data, isLoading } = useAnalyticsMetrics(range)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const chartData =
    data?.status === 200 && data.data
      ? data.data.map((item) => ({
          date: format(new Date(item.date), 'MMM dd'),
          fullDate: item.date,
          dms: item.dms,
          comments: item.comments,
          total: item.total,
        }))
      : []

  if (isLoading) {
    return (
      <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5">
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-text-secondary">Loading analytics...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5 group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">
          Activity Over Time
        </h3>
        <Select
          value={range}
          onValueChange={(value) => setRange(value as AnalyticsTimeRange)}
        >
          <SelectTrigger className="w-[140px] h-8 border-in-active/50 bg-background-90 text-text-secondary hover:border-light-blue/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background-80 border-in-active/50">
            <SelectItem value="7d" className="text-text-secondary">Last 7 days</SelectItem>
            <SelectItem value="30d" className="text-text-secondary">Last 30 days</SelectItem>
            <SelectItem value="90d" className="text-text-secondary">Last 90 days</SelectItem>
            <SelectItem value="all" className="text-text-secondary">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
        <ResponsiveContainer height={280} width={'100%'}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 12,
                top: 12,
                bottom: 12,
              }}
              onMouseMove={(state) => {
                if (state?.activeTooltipIndex !== undefined) {
                  setActiveIndex(state.activeTooltipIndex)
                }
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#545454"
                className="opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={6}
                className="transition-all duration-300 text-xs"
                style={{
                  fill: '#9B9CA0',
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                style={{
                  fill: '#9B9CA0',
                }}
              />
              <ChartTooltip
                cursor={{
                  stroke: '#3352CC',
                  strokeWidth: 2,
                  strokeDasharray: '5 5',
                }}
                contentStyle={{
                  backgroundColor: '#252525',
                  border: '1px solid #545454',
                  borderRadius: '0.75rem',
                }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                  />
                }
              />
              <Area
                dataKey="dms"
                type="natural"
                stackId="1"
                fill="#3352CC"
                fillOpacity={0.3}
                stroke="#3352CC"
                strokeWidth={activeIndex !== null ? 2.5 : 2}
                className="transition-all duration-300"
              />
              <Area
                dataKey="comments"
                type="natural"
                stackId="1"
                fill="#7C3AED"
                fillOpacity={0.3}
                stroke="#7C3AED"
                strokeWidth={activeIndex !== null ? 2.5 : 2}
                className="transition-all duration-300"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#3352CC' }}
            />
            <span className="text-text-secondary">DMs</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#7C3AED' }}
            />
            <span className="text-text-secondary">Comments</span>
          </div>
        </div>
    </div>
  )
}

export default Chart
