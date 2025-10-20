import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityMetricsChart = ({ pickups }) => {
  // Group pickups by month
  const monthlyCounts = {};
  pickups.forEach(p => {
    const date = new Date(p.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
  });

  // Sort months
  const months = Object.keys(monthlyCounts).sort();
  const counts = months.map(m => monthlyCounts[m]);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Pickups per Month',
        data: counts,
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Your Recycling Activity',
      },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Pickups' }, beginAtZero: true },
    },
  };

  return (
    <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityMetricsChart;
