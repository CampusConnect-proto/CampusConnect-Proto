"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Property } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Home } from "lucide-react"

const chartConfig = {
  rent: {
    label: "Rent",
    color: "hsl(var(--primary))",
  },
}

interface OwnerEarningsChartProps {
    properties: Property[] | null
}

export function OwnerEarningsChart({ properties }: OwnerEarningsChartProps) {

  if (!properties || properties.length === 0) {
      return (
          <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4 text-center">
              <Home className="w-12 h-12 text-muted-foreground/50"/>
              <div className="space-y-1">
                <h3 className="font-semibold">No Property Data</h3>
                <p className="text-sm text-muted-foreground">Your property rent data will appear here once you add properties.</p>
              </div>
          </div>
      )
  }

  const chartData = properties.map(prop => ({
      name: prop.name,
      rent: prop.rent
  }));

  return (
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <BarChart 
            accessibilityLayer 
            data={chartData}
            layout="vertical"
            margin={{
                left: -20,
            }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            width={120}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
          />
          <XAxis dataKey="rent" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="rent" fill="var(--color-rent)" radius={4} />
        </BarChart>
      </ChartContainer>
  )
}
