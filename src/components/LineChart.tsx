import React from 'react';
import { ResponsiveLine } from 'nivo';
import { useIntl, defineMessages } from "react-intl";

type LineChartProps = {
  data: object,
  width: string,
  height: string
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({ data, height, width } : LineChartProps) => {
  const intl = useIntl();

  const theme = {
    axis: {
      textColor: '#eee',
      fontSize: '12px',
      tickColor: '#eee',
    },
    grid: {
      stroke: '#888',
      strokeWidth: 1
    },
  };

  return (
    <div style={{height, width}}>

      <ResponsiveLine
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 50 }}
        dotSize={6}
        theme={theme}
        useMesh={true}
      />
    </div>
  );
}

export default LineChart;
