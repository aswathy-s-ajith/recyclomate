import React from "react";

// RecycloMate - User Dashboard Component (integrated version)
// This component displays the logged-in user's recycling dashboard.
// Props make it easy to integrate with other parts of the project.

export default function UserDashboard({ user, onSchedulePickup }) {
  // Default fallback data for testing/demo purposes
  const demoUser = {
    name: "Azeen",
    upcoming: {
      wasteType: "Plastic",
      address: "23, Green Street",
      time: "12 Oct, 10:00 AM",
      status: "Scheduled",
    },
    eco: {
      plastic: 55,
      paper: 25,
      glass: 20,
    },
  };

  const currentUser = user || demoUser;

  const total =
    currentUser.eco.plastic + currentUser.eco.paper + currentUser.eco.glass;

  function pct(value) {
    return Math.round((value / total) * 100);
  }

  const slices = (() => {
    const values = [
      currentUser.eco.plastic,
      currentUser.eco.paper,
      currentUser.eco.glass,
    ];
    const colors = ["#34D399", "#6EE7B7", "#FBBF24"];
    let start = 0;
    const radius = 48;
    const circumference = Math.PI * 2 * radius;

    return values.map((v, i) => {
      const fraction = v / total;
      const dash = fraction * circumference;
      const gap = circumference - dash;
      const strokeDasharray = `${dash} ${gap}`;
      const rotation = (start / total) * 360;
      start += v;
      return {
        strokeDasharray,
        rotation,
        color: colors[i],
      };
    });
  })();

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6">
      <div className="w-full max-w-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L15 8H9L12 2Z" fill="#10B981" />
              <path d="M4 10C4 10 6 7 10 7V12L4 10Z" fill="#10B981" />
              <path d="M20 10C20 10 18 7 14 7V12L20 10Z" fill="#10B981" />
            </svg>
            <span className="font-semibold text-lg">RecycloMate</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                fill="#374151"
              />
              <path
                d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20V21H4V20Z"
                fill="#374151"
              />
            </svg>
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-extrabold leading-tight mb-1">Welcome back,</h1>
        <h2 className="text-3xl font-extrabold mb-4">{currentUser.name}!</h2>
        <p className="text-gray-600 mb-4">Ready to recycle smart today?</p>

        {/* Schedule Pickup Button */}
        <button
          onClick={onSchedulePickup}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm mb-6"
        >
          Schedule a New Pickup
        </button>

        {/* Upcoming Pickup Section */}
        <h3 className="text-xl font-semibold mb-3">Upcoming Pickup</h3>
        <div className="bg-white rounded-xl shadow p-4 mb-8">
          <div className="grid grid-cols-2 gap-3 text-gray-700">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Waste Type</span>
              <span className="font-medium">{currentUser.upcoming.wasteType}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Address</span>
              <span className="font-medium">{currentUser.upcoming.address}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">Time</span>
              <span className="font-medium">{currentUser.upcoming.time}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">Status</span>
              <span className="font-medium text-green-600">
                {currentUser.upcoming.status} ✓
              </span>
            </div>
          </div>
        </div>

        {/* Eco Impact Section */}
        <h3 className="text-xl font-semibold mb-4">Your Eco Impact</h3>
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <svg width="110" height="110" viewBox="0 0 110 110" className="flex-shrink-0">
            <g transform="translate(5,5)">
              <circle cx="52" cy="52" r="48" fill="#fff" />
              {slices.map((s, i) => (
                <circle
                  key={i}
                  cx="52"
                  cy="52"
                  r="48"
                  fill="transparent"
                  stroke={s.color}
                  strokeWidth="96"
                  strokeDasharray={s.strokeDasharray}
                  transform={`rotate(${s.rotation} 52 52)`}
                />
              ))}
              <circle cx="52" cy="52" r="28" fill="#ffffff" />
            </g>
          </svg>

          <div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full block bg-green-400" />
                <span className="text-gray-600">Plastic</span>
                <span className="ml-2 font-medium">{pct(currentUser.eco.plastic)}%</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full block bg-green-200" />
                <span className="text-gray-600">Paper</span>
                <span className="ml-2 font-medium">{pct(currentUser.eco.paper)}%</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full block bg-yellow-400" />
                <span className="text-gray-600">Glass</span>
                <span className="ml-2 font-medium">{pct(currentUser.eco.glass)}%</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
