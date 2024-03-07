import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { UserData } from './types';

type Props = {
  userData: UserData
}

const BarChart = ({ userData }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)
  
  const sortedData = userData.submissions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  }).map(({ date, durationSlept }) => ({ date, durationSlept })) 

  const xAxisData = sortedData.map(({ date }) => date)
  const seriesData = sortedData.map(({ durationSlept }) => durationSlept)

  const option: echarts.EChartsOption = {
    xAxis: {
      name: 'Dates',
      nameLocation: 'middle',
      nameGap: 50,
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      name: 'Sleep Duration (hours)',
      nameLocation: 'middle',
      nameGap: 50,
      type: 'value'
    },
    series: [
      {
        data: seriesData,
        type: 'bar'
      }
    ],
  };

  useEffect(() => {
    if (ref.current) {
      setChart(echarts.init(ref.current))
    }
  }, [])

  option && chart?.setOption(option);

  window.addEventListener('resize', function() {
    chart?.resize();
  });

  return (
    <div ref={ref} style={{ width: '100%', height: 700 }}></div>
  )
}

export default BarChart