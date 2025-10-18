import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Recycle, Calendar, Award, Truck } from "lucide-react";

const data = [
  { name: "Plastic", value: 45, color: "#22c55e" },
  { name: "Paper", value: 30, color: "#4ade80" },
  { name: "Glass", value: 25, color: "#facc15" },
];

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full max-w-6xl bg-white shadow-sm rounded-2xl p-6 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Recycle className="text-green-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-gray-800">RecycloMate</h1>
        </div>
        <div className="text-gray-700 font-medium">Hi, Azeen 👋</div>
      </div>

      {/* Welcome Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Azeen!
          </h2>
          <p className="text-gray-600 mb-6">Ready to recycle smart today</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg w-fit transition">
            Schedule a New Pickup
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Total Pickups */}
          <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <Recycle className="text-green-600 w-6 h-6 mb-2" />
            <p className="text-gray-500 text-sm">Total Pickups</p>
            <p className="text-2xl font-semibold text-gray-800">8</p>
          </div>

          {/* Eco Points */}
          <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <Award className="text-green-600 w-6 h-6 mb-2" />
            <p className="text-gray-500 text-sm">Eco Points</p>
            <p className="text-2xl font-semibold text-gray-800">120</p>
          </div>

          {/* Upcoming Pickup */}
          <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <Truck className="text-green-600 w-6 h-6 mb-2" />
            <p className="text-gray-500 text-sm">Upcoming Pickup</p>
            <p className="text-lg font-semibold text-gray-800">Plastic</p>
          </div>

          {/* Next Pickup */}
          <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <Calendar className="text-green-600 w-6 h-6 mb-2" />
            <p className="text-gray-500 text-sm">Next Pickup</p>
            <p className="text-lg font-semibold text-gray-800">
              12 Oct · 10:00 AM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Upcoming Pickup Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Upcoming Pickup
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Item:</span> Plastic
            </p>
            <p>
              <span className="font-semibold">Address:</span> 23, Green M
            </p>
            <p>
              <span className="font-semibold">Date:</span> 12 Oct, 10:00 AM
            </p>
            <button
              className="text-green-600 font-medium hover:underline focus:outline-none"
              onClick={() => alert('Redirecting to all pickups...')}
            >
              View All Pickups
            </button>
          </div>
        </div>

        {/* Eco Impact Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Eco Impact</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                <span>Plastic</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span>Paper</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span>Glass</span>
              </p>
            </div>
            <div className="w-40 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} dataKey="value" outerRadius={70}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
