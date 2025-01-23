import React from 'react';
import { Line, LineConfig, Plot, PlotEvent } from '@ant-design/plots';

const LineOnReadyExample = () => {
  const data = [
    {
      Date: '2016-11',
      scales: 278,
    },
    {
      Date: '2016-12',
      scales: 195,
    },
    {
      Date: '2017-01',
      scales: 145,
    },
    {
      Date: '2017-02',
      scales: 207,
    },
  ];
  const config: LineConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    // TODO which type to choose for `plot`?
    // onReady: (plot: Plot<LineConfig>) => {
    onReady: (plot: Plot<any>) => {
      plot.on('mousemove', (evt: PlotEvent) => {
        console.log('mousemove', evt);
      });

    }
  };
  return <Line {...config} />;
};

export default LineOnReadyExample;
