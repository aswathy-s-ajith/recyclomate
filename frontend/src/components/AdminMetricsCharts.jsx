import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const AdminMetricsCharts = ({ pickups }) => {
  const [chartType, setChartType] = useState('line'); // 'line' or 'pie'

  // Line chart: total pickups per month
  const monthlyCounts = {};
  pickups.forEach(p => {
    const date = new Date(p.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
  });
  const months = Object.keys(monthlyCounts).sort();
  const counts = months.map(m => monthlyCounts[m]);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Total Pickups',
        data: counts,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76,175,80,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Pie chart: waste collection by type (using segregated weights)
  const wasteTypes = ["Plastic", "Paper", "Glass", "Metal", "E-Waste"];
  const typeWeights = { Plastic: 0, Paper: 0, Glass: 0, Metal: 0, "E-Waste": 0 };
  pickups.forEach(p => {
    if (p.weights && typeof p.weights === 'object') {
      wasteTypes.forEach(type => {
        if (typeof p.weights[type] === 'number') {
          typeWeights[type] += p.weights[type];
        }
      });
    }
  });
  const wasteCounts = wasteTypes.map(t => typeWeights[t]);

  const pieData = {
    labels: wasteTypes,
    datasets: [
      {
        label: 'Waste Collection by Type (kg)',
        data: wasteCounts,
        backgroundColor: [
          '#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'
        ],
      },
    ],
  };

  return (
    <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: chartType === 'line' ? '#4CAF50' : '#e0e0e0',
            color: chartType === 'line' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setChartType('line')}
        >
          Total Pickups Over Time
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: chartType === 'pie' ? '#4CAF50' : '#e0e0e0',
            color: chartType === 'pie' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setChartType('pie')}
        >
          Waste Collection by Type
        </button>
      </div>
      {chartType === 'line' ? (
        <Line data={lineData} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Total Pickups Over Time' },
          },
          scales: {
            x: { title: { display: true, text: 'Month' } },
            y: { title: { display: true, text: 'Pickups' }, beginAtZero: true },
          },
        }} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ maxWidth: 500, maxHeight: 500, width: '100%' }}>
            <Pie 
              data={pieData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: true, text: 'Waste Collection by Type (kg)' },
                },
              }} 
              width={500}
              height={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMetricsCharts;
