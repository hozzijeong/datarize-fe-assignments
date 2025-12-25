import ReactECharts from 'echarts-for-react'
import type { PurchaseFrequency } from '../types'
import type { EChartsOption, TooltipComponentFormatterCallbackParams } from 'echarts'
import { PurchaseFrequencyChartSkeleton } from './PurchaseFrequencyChartSkeleton'
import { PurchaseFrequencyChartErrorFallback } from './PurchaseFrequencyChartErrorFallback'

interface PurchaseFrequencyChartProps {
  data: PurchaseFrequency[]
}

function formatPriceRange(range: string, index: number): string {
  if (index === 0) {
    return '2만원 이하'
  }

  const [, end] = range.split(' - ')
  const endValue = parseInt(end, 10)
  const label = endValue / 10000 - 1

  return `${label}만원대`
}

export function PurchaseFrequencyChart({ data }: PurchaseFrequencyChartProps) {
  const dataset = data.map((d, index) => ({
    range: formatPriceRange(d.range, index),
    count: d.count,
  }))

  const option: EChartsOption = {
    dataset: {
      dimensions: ['range', 'count'],
      source: dataset,
    },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'shadow' as const,
        snap: true,
        label: { show: false },
        shadowStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#EAFBF7' },
              { offset: 1, color: '#EAFBF700' },
            ],
          },
        },
        z: -1,
      },
      formatter: (params: TooltipComponentFormatterCallbackParams) => {
        if (!Array.isArray(params) || params.length === 0) return ''

        const param = params[0]
        const data = param.data as { range: string; count: number }

        return `
          <div class="w-32">
            <h4>${param.seriesName}</h4>
            <div class="flex justify-between items-center">
              <span class="mb-1 text-xs text-brand-black-900">${data.range}</span>
              <span class="text-sm font-semibold text-brand-black-1200">${data.count.toLocaleString()}회</span>
            </div>
          </div>
        `
      },
      padding: [8, 12],
      backgroundColor: '#ffffff',
      borderColor: '#cbdbf6',
      borderWidth: 1,
      borderRadius: 8,
    },
    grid: {
      left: 16,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 12,
        rotate: 0,
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#D6E3E2',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '가격대별 구매 횟수',
        type: 'bar',
        encode: {
          x: 'range',
          y: 'count',
        },
        itemStyle: {
          color: '#4DDBBE',
          borderRadius: [8, 8, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: '#06C29C',
          },
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />
}

PurchaseFrequencyChart.Fallback = PurchaseFrequencyChartSkeleton
PurchaseFrequencyChart.ErrorFallback = PurchaseFrequencyChartErrorFallback
