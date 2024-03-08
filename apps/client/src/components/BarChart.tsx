import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { User } from '../types'
import { format } from 'date-fns'

type Props = {
  userData: User
}

const BarChart = ({ userData }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)

  const sortedData = userData.sleepPatterns
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    .map(({ date, duration }) => ({ date, duration }))

  const xAxisData = sortedData.map(({ date }) =>
    format(new Date(date), 'yyyy-mm-dd'),
  )
  const seriesData = sortedData.map(({ duration }) => duration)

  const option: echarts.EChartsOption = {
    xAxis: {
      name: 'Dates',
      nameLocation: 'middle',
      nameGap: 50,
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      name: 'Sleep Duration (hours)',
      nameLocation: 'middle',
      nameGap: 50,
      type: 'value',
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
      },
    ],
  }

  useEffect(() => {
    if (ref.current) {
      setChart(echarts.init(ref.current))
    }
  }, [])

  option && chart?.setOption(option)

  window.addEventListener('resize', function () {
    chart?.resize()
  })

  return <div ref={ref} style={{ width: '100%', height: 700 }}></div>
}

export default BarChart
