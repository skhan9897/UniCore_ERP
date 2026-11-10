import React from 'react';
import { Home, Users, CheckCircle, Bed } from 'lucide-react';

const HOSTELS = [
  { name: 'Alpha Boys Hostel Block A', capacity: '400 Beds', occupied: '348 Beds', occupancyRate: '87.0%', warden: 'Dr. Arthur Pendelton' },
  { name: 'Beta Girls Hostel Block B', capacity: '350 Beds', occupied: '280 Beds', occupancyRate: '80.0%', warden: 'Dr. Maria Santos' },
  { name: 'Gamma International Hostel', capacity: '150 Beds', occupied: '110 Beds', occupancyRate: '73.3%', warden: 'Prof. David Chen' },
];

const HostelManagement = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="w-7 h-7 text-purple-600" />
            Hostels & Residential Facilities
          </h1>
          <p className="text-sm text-gray-500 mt-1">Overall Occupancy Rate: 82.0% • 738 Residents Accommodated</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {HOSTELS.map((h) => (
          <div key={h.name} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">{h.name}</h3>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{h.occupancyRate}</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Capacity: <span className="font-bold text-gray-900">{h.capacity}</span></p>
              <p>Occupied: <span className="font-bold text-emerald-600">{h.occupied}</span></p>
              <p>Hostel Warden: <span className="font-semibold text-gray-800">{h.warden}</span></p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-600 h-full" style={{ width: h.occupancyRate }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelManagement;
