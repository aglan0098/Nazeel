"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { type: "التنفيذ", numer: 20 },
  { type: "المخدرات", numer: 10 },
  { type: "السرقات", numer: 4 },
  { type: "مخالفة لأنظمه الددولة", numer: 2 },
];

const chartConfig = {
  numer: {
    label: "العدد",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ChartBarLabel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>نظره عامة - القضايا</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="numer" fill="var(--color-main)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
