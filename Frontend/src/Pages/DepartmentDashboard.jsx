import React from "react";

const DepartmentDashboard = ({ AddMaintenance ,countTask , completed}) => {

  // Department-wise count
  const departmentCount = {
    mechanical: 0,
    electrical: 0,
    signal_telecom: 0,
    carriage_wagon: 0,
    traction: 0,
    operations: 0,
    engineering: 0,
    railway_safety: 0,
    maintenance: 0,
  };

  // Status-wise count
  const statusCount = {
    pending: 0,
    "in-progress": 0,
    completed: 0,
  };

  // Loop through tasks
  //! to show the department on the browser fetch from the database;
  AddMaintenance.forEach((task) => {
    if (task.department && departmentCount[task.department] !== undefined) {
      departmentCount[task.department]++;
    }

    if (task.status && statusCount[task.status] !== undefined) {
      statusCount[task.status]++;
    }
  });

  const departments = Object.keys(departmentCount);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* ================= Department Section ================= */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Department Status Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {departments.map((dept, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-700 capitalize">
              {dept.replace("_", " ")}
            </h2>

            <p className="mt-3 text-5xl font-bold text-blue-600">
              {departmentCount[dept]}
            </p>

            <p className="text-gray-500 mt-1 text-sm">Total Tasks</p>
          </div>
        ))}
      </div>

      {/* ================= Task Status Section ================= */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Task Progress Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Pending */}
        <div className="bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700">Pending</h2>
          <p className="mt-3 text-5xl font-bold text-yellow-500">
            {countTask}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700">Completed</h2>
          <p className="mt-3 text-5xl font-bold text-green-500">
            {completed}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DepartmentDashboard;
