import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Stats = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('keenkeeper_timeline')) || [];

    let callCount = 0;
    let textCount = 0;
    let videoCount = 0;

    savedEvents.forEach(event => {
      if (event.type === 'Call') callCount++;
      if (event.type === 'Text') textCount++;
      if (event.type === 'Video') videoCount++;
    });
    if (callCount === 0 && textCount === 0 && videoCount === 0) {
      setChartData([
        { name: 'Text', value: 5 },
        { name: 'Call', value: 3 },
        { name: 'Video', value: 2 }
      ]);
    } else {

      setChartData([
        { name: 'Text', value: textCount },
        { name: 'Call', value: callCount },
        { name: 'Video', value: videoCount }
      ]);
    }
  }, []);

  const COLORS = ['#8b5cf6', '#1e3932', '#22c55e']; 

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[60vh]">
      
      <div className="mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19]">
          Friendship Analytics
        </h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-600 font-medium mb-6">By Interaction Type</h3>
        
        <div className="h-100 w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={150}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-gray-600 font-medium ml-1 mr-4">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Stats;