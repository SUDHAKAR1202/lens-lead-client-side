import React from "react";
import Chart from "react-apexcharts";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  // Bar chart for monthly revenue
  const revenueChartOptions = {
    chart: { 
      id: "monthly-revenue", 
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    xaxis: { 
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        },
        formatter: function(value) {
          return "$" + value;
        }
      }
    },
    colors: ["#3B82F6"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#F3F4F6",
      strokeDashArray: 4
    },
    stroke: {
      curve: "smooth",
      width: 2
    }
  };

  const revenueChartSeries = [
    { name: "Revenue", data: [2200, 3400, 2800, 4500, 5200, 6100, 5900, 6700, 7300, 6800, 7500, 8200] },
  ];

  // Pie chart for booking types
  const bookingTypeOptions = {
    labels: ["Weddings", "Portraits", "Events", "Commercial"],
    colors: ["#4F46E5", "#F59E0B", "#10B981", "#EF4444"],
    legend: { 
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: "#374151"
      }
    },
    dataLabels: {
      style: {
        fontFamily: "Inter, sans-serif"
      }
    }
  };

  const bookingTypeSeries = [45, 25, 20, 10];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's your photography business at a glance.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  title: "Total Bookings", 
                  value: "24", 
                  change: "+12%", 
                  changePositive: true,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                },
                { 
                  title: "Upcoming Sessions", 
                  value: "8", 
                  change: "+2", 
                  changePositive: true,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                },
                { 
                  title: "Client inquiries", 
                  value: "14", 
                  change: "-3", 
                  changePositive: false,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                { 
                  title: "Revenue this month", 
                  value: "$6,700", 
                  change: "+18%", 
                  changePositive: true,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white shadow rounded-lg p-5 flex flex-col justify-between border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.changePositive ? 'bg-green-100' : 'bg-red-100'}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-sm mt-3 ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.changePositive ? '↑' : '↓'} {stat.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white p-3 shadow rounded-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
                <Chart
                  options={revenueChartOptions}
                  series={revenueChartSeries}
                  type="bar"
                  height={300}
                />
              </div>
              <div className="bg-white p-3 shadow rounded-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Types</h2>
                <Chart
                  options={bookingTypeOptions}
                  series={bookingTypeSeries}
                  type="donut"
                  height={300}
                />
              </div>
            </div>

            {/* Recent Activity & Top Clients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white p-3 shadow rounded-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                  {[
                    { action: "New booking", client: "Sarah Johnson", date: "Wedding - Oct 15", time: "2 hours ago" },
                    { action: "Gallery delivered", client: "Michael Brown", date: "Portrait Session", time: "Yesterday" },
                    { action: "Payment received", client: "Jennifer Wilson", date: "$1,200 - Event", time: "2 days ago" },
                    { action: "Client inquiry", client: "Robert Davis", date: "Commercial Shoot", time: "3 days ago" },
                    { action: "Photos edited", client: "Emily Thompson", date: "50 images", time: "4 days ago" },
                  ].map((activity, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        i === 0 ? 'bg-blue-100' : 
                        i === 1 ? 'bg-green-100' : 
                        i === 2 ? 'bg-purple-100' : 
                        i === 3 ? 'bg-yellow-100' : 'bg-pink-100'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                          i === 0 ? 'text-blue-500' : 
                          i === 1 ? 'text-green-500' : 
                          i === 2 ? 'text-purple-500' : 
                          i === 3 ? 'text-yellow-500' : 'text-pink-500'
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.client} · {activity.date}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Clients */}
              <div className="bg-white p-3 shadow rounded-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Clients</h2>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: "Sarah Johnson", sessions: 5, value: "$4,200" },
                        { name: "Michael Brown", sessions: 3, value: "$2,800" },
                        { name: "Jennifer Wilson", sessions: 2, value: "$2,100" },
                        { name: "Robert Davis", sessions: 2, value: "$1,900" },
                        { name: "Emily Thompson", sessions: 1, value: "$1,500" },
                      ].map((client, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{client.sessions}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{client.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}