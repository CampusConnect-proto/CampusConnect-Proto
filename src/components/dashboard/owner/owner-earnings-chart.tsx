"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", rent: 18600 },
  { month: "February", rent: 30500 },
  { month: "March", rent: 23700 },
  { month: "April", rent: 7300 },
  { month: "May", rent: 20900 },
  { month: "June", rent: 21400 },
]

const chartConfig = {
  rent: {
    label: "Rent",
    color: "hsl(var(--primary))",
  },
}

export function OwnerEarningsChart() {
  return (
      <ChartContainer config={chartConfig} className="w-full h-[300px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="rent" fill="var(--color-rent)" radius={4} />
        </BarChart>
      </ChartContainer>
  )
}
