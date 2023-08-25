import './App.css';
import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import SoftooApiService from './services/SoftooApiService';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =  () => {
     SoftooApiService.getSupplyData().then((resp) => {
      if (resp)
        setData(resp.data); // Assuming the API response is an array of data points

    }).catch((error) => {
      console.log(error)
    })
  };

  const generateChartOptions = () => {
    // Create ECharts options based on fetched data and colorMap
    const colorMap = {
      'Main': "#B798F5",
      'Solar': "#02E10C",
      'DG': "#403F3D",
      'Battery': "#FDE602",
      'Solar+Battery': "#86B0FF",
      'Battery+Solar': "#86B0FF",
      'Main+Solar': "#7243D0",
      'Main+Battery': "#32864B",
      'Main+Solar+Battery': "#8BC486",
      'DG+Battery': 'magenta',
      'DG+Solar+Battery': 'cyan',
      'DG+Battery+Solar': 'cyan',
      'Undetermined': "#BBE3FD",
      '': 'white'
    };

    const xAxisData = []; // Dates
    const yAxisData = []; // Time intervals
    const seriesData = []; // Power source data

    data.forEach((point) => {
      // Process each data point and populate xAxisData, yAxisData, and seriesData arrays
      xAxisData.push(point.date);
      yAxisData.push(point.minute_window);
      seriesData.push({
        value: point.sourceTag,
        itemStyle: { color: colorMap[point.sourceTag] },
      });
    });

    return {
      xAxis: { data: xAxisData },
      yAxis: { data: yAxisData },
      series: [{ data: seriesData, type: 'scatter' }],
      tooltip: { trigger: 'item', formatter: '{b} - {c}' }, // Customize the tooltip format
    };
  };

  return (
    <div>
      <h1>Power Source Chart</h1>
      <div>
        <ReactECharts option={generateChartOptions()} style={{ height: '500px' }} />
      </div>
    </div>
  );

}

export default App;
