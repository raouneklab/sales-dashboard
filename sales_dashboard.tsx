import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample sales data - replace this with real data later
const salesData = [
  { month: 'Jan', revenue: 45000, orders: 120, marketing: 5000, region: 'North' },
  { month: 'Jan', revenue: 38000, orders: 95, marketing: 4200, region: 'South' },
  { month: 'Jan', revenue: 52000, orders: 140, marketing: 5500, region: 'East' },
  { month: 'Feb', revenue: 48000, orders: 125, marketing: 5200, region: 'North' },
  { month: 'Feb', revenue: 42000, orders: 105, marketing: 4500, region: 'South' },
  { month: 'Feb', revenue: 55000, orders: 150, marketing: 5800, region: 'East' },
  { month: 'Mar', revenue: 51000, orders: 135, marketing: 5400, region: 'North' },
  { month: 'Mar', revenue: 45000, orders: 115, marketing: 4800, region: 'South' },
  { month: 'Mar', revenue: 58000, orders: 160, marketing: 6000, region: 'East' },
  { month: 'Apr', revenue: 53000, orders: 140, marketing: 5600, region: 'North' },
  { month: 'Apr', revenue: 47000, orders: 120, marketing: 5000, region: 'South' },
  { month: 'Apr', revenue: 61000, orders: 170, marketing: 6200, region: 'East' },
  { month: 'May', revenue: 56000, orders: 148, marketing: 5800, region: 'North' },
  { month: 'May', revenue: 49000, orders: 128, marketing: 5200, region: 'South' },
  { month: 'May', revenue: 64000, orders: 178, marketing: 6500, region: 'East' },
  { month: 'Jun', revenue: 59000, orders: 155, marketing: 6000, region: 'North' },
  { month: 'Jun', revenue: 52000, orders: 135, marketing: 5500, region: 'South' },
  { month: 'Jun', revenue: 67000, orders: 185, marketing: 6800, region: 'East' },
];

function Dashboard() {
  const [region, setRegion] = useState('All');

  // filter data based on selected region
  const filtered = useMemo(() => {
    if (region === 'All') return salesData;
    return salesData.filter(d => d.region === region);
  }, [region]);

  // calculate totals
  const totals = useMemo(() => {
    const totalRev = filtered.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = filtered.reduce((sum, d) => sum + d.orders, 0);
    const totalMarketing = filtered.reduce((sum, d) => sum + d.marketing, 0);
    
    // TODO: add more metrics here
    const avgOrder = totalOrders > 0 ? totalRev / totalOrders : 0;
    const roi = totalMarketing > 0 ? ((totalRev - totalMarketing) / totalMarketing * 100) : 0;

    return {
      revenue: totalRev,
      orders: totalOrders,
      marketing: totalMarketing,
      avgOrder: avgOrder,
      roi: roi
    };
  }, [filtered]);

  // group by month for chart
  const monthlyData = useMemo(() => {
    const groups = {};
    filtered.forEach(d => {
      if (!groups[d.month]) {
        groups[d.month] = { month: d.month, revenue: 0, orders: 0 };
      }
      groups[d.month].revenue += d.revenue;
      groups[d.month].orders += d.orders;
    });
    return Object.values(groups);
  }, [filtered]);

  // regional breakdown
  const regionalData = useMemo(() => {
    const groups = {};
    salesData.forEach(d => {
      if (!groups[d.region]) {
        groups[d.region] = { region: d.region, revenue: 0 };
      }
      groups[d.region].revenue += d.revenue;
    });
    return Object.values(groups);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sales Dashboard</h1>
          <p className="text-gray-600">Track revenue and performance metrics</p>
        </div>

        {/* filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="text-sm font-medium text-gray-700 mr-3">Filter by Region:</label>
          <select 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="All">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
          </select>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-2xl font-bold text-blue-600">
              ${totals.revenue.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600">Total Orders</div>
            <div className="text-2xl font-bold text-green-600">
              {totals.orders.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600">Avg Order Value</div>
            <div className="text-2xl font-bold text-purple-600">
              ${Math.round(totals.avgOrder).toLocaleString()}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600">Marketing ROI</div>
            <div className="text-2xl font-bold text-orange-600">
              {totals.roi.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* revenue trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* regional comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue by Region</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* notes section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Quick Insights</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Revenue trending upward across all regions</li>
            <li>• East region performing strongest overall</li>
            <li>• Marketing ROI is healthy at {totals.roi.toFixed(0)}%</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;