'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

type Props = {}

const chartData = [
  { month: 'January', desktop: 86 },
  { month: 'February', desktop: 50 },
  { month: 'March', desktop: 37 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 29 },
  { month: 'June', desktop: 14 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
}

const Chart = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Card className="border-none p-0 group hover:scale-[1.01] transition-transform duration-300">
      <CardContent className="p-0">
        <ResponsiveContainer
          height={300}
          width={'100%'}
        >
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
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
                className="opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                className="transition-all duration-300"
                style={{
                  fill: 'var(--text-secondary)',
                }}
              />
              <ChartTooltip
                cursor={{ 
                  stroke: 'var(--color-desktop)',
                  strokeWidth: 2,
                  strokeDasharray: '5 5',
                }}
                content={
                  <ChartTooltipContent 
                    indicator="line"
                    className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                  />
                }
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                strokeWidth={activeIndex !== null ? 3 : 2}
                className="transition-all duration-300"
                style={{
                  filter: activeIndex !== null ? 'drop-shadow(0 0 8px hsl(var(--chart-1) / 0.5))' : 'none',
                  transition: 'all 0.3s ease',
                }}
                animationDuration={1000}
                animationBegin={0}
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Chart
