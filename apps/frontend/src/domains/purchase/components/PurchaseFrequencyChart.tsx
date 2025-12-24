import ReactECharts from 'echarts-for-react'
import type { PurchaseFrequency } from '../types'

interface PurchaseFrequencyChartProps {
  data: PurchaseFrequency[]
}

export function PurchaseFrequencyChart({ data }: PurchaseFrequencyChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.range),
      axisLabel: {
        rotate: 45,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      name: '구매 횟수',
    },
    series: [
      {
        name: '구매 빈도',
        type: 'bar',
        data: data.map((d) => d.count),
        itemStyle: {
          color: '#3b82f6',
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
}
