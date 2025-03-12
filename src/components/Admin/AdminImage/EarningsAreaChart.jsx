// EarningsAreaChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const EarningsAreaChart = ({ earningsData }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: earningsData,
        fill: true, // Fill the area under the line
        backgroundColor: 'rgba(173, 216, 230, 0.6)', // Light blue for the fill (smooth curve background)
        borderColor: 'rgba(75, 192, 192, 1)', // Dark teal for the line
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to take full height of the container
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Earnings ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=" bg-[#f4fcff] border-[#afe9fd] border p-4 rounded-lg 2xl:w-auto 2  xxxm:w-[500px]    shadow-lg max-h-screen w-full h-80 py-[25px]"> 
    <h2 className="text-xl font-semibold">Yearly Earnings</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default EarningsAreaChart;
