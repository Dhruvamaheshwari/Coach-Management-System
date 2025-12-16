import React, { useRef, useState } from 'react'

const MaintenanceTaskOutputForm = ({AddMaintenace , ContTask , deleteTask}) => {

  // TO FIND COUNT OF THE TASK;
  ContTask(AddMaintenace);
return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-900">Maintenance Tasks</h1>
      <p className="text-gray-500 mb-8">Assign and track repair jobs</p>

      {/* GRID OF TASK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {AddMaintenace.length === 0 ? (
          <p className="text-gray-500">No maintenance tasks created yet.</p>
        ) : (
          AddMaintenace.map((task, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition"
            >
              {/* TOP ROW: PRIORITY + DATE */}
              <div className="flex justify-between items-center mb-3">
                
                {/* PRIORITY TAG */}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "medium"
                      ? "bg-blue-100 text-blue-600"
                      : task.priority === "critical"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.priority}
                </span>
                                <span
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "medium"
                      ? "bg-blue-100 text-blue-600"
                      : task.priority === "critical"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.department}
                </span>

                <span className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              {/* TASK TITLE */}
              <h2 className="text-xl font-semibold text-gray-900">
                {task.title}
              </h2>

              {/* COACH ID */}
              <p className="text-blue-600 font-medium mt-1">
                {task.coach}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mt-3">
                {task.description}
              </p>

              {/* FOOTER WITH STATUS */}
              {/* <div className="mt-6 border-t pt-3">
                <select className="text-gray-700 border rounded-lg px-3 py-2">
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div> */}
              <div className="mt-6 border-t pt-3 flex justify-center">
                <button onClick={()=>deleteTask(task._id)} className="text-gray-700 border rounded-lg px-3 py-2 cursor-pointer bg-green-300 w-50 ">Done</button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );


   
};

export default MaintenanceTaskOutputForm