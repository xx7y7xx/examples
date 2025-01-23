import React from 'react';
import { Line, LineConfig } from '@ant-design/plots';

const Application = () => {
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
  };
  return <Line {...config} />;
};

export default Application;
