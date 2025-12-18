import React, { useRef, useState } from 'react'

const MaintenanceTaskOutputForm = ({ AddMaintenace, ContTask, deleteTask, coachList }) => {

  // TO FIND COUNT OF THE TASK;
  ContTask(AddMaintenace);
  return (
    // Main content area wrapper, padding handled by the parent component (MaintenanceTask.jsx)
    <div className="font-sans"> 

      {/* HEADER: Moved to the Parent Component for clean layout, but keeping this styling if needed */}
      <div className="px-8 pb-8">

        {/* GRID OF TASK CARDS (Modern grid layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {AddMaintenace.length === 0 ? (
            // Empty State: Clean, light box
            <div className="text-gray-700 text-xl col-span-full py-12 text-center bg-white rounded-xl border border-gray-200 shadow-md">
                <p className='font-bold mb-2'>No active maintenance tasks.</p>
                <p className='text-base text-gray-500'>Please use the "Assign New Task" button to create new work orders.</p>
            </div>
          ) : (
            AddMaintenace.map((task, index) => {
              
              const coachDetails = task.selectCoach;
              
              // Defined official colors for priority tags
              const priorityClasses =
                task.priority === "high"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : task.priority === "medium"
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : task.priority === "critical"
                      ? "bg-red-100 text-red-800 border border-red-400 font-extrabold" // Strongest red for CRITICAL
                      : "bg-green-50 text-green-700 border border-green-200"; // Low/Routine is green

              return (
                <div
                  key={index}
                  // CARD DESIGN: Floating, rounded, white, with subtle shadow and soft blue hover border
                  className="bg-white rounded-xl p-5 flex flex-col transition duration-300 shadow-lg border-b-4 border-white hover:border-blue-200 hover:shadow-xl"
                >

                  {/* TOP ROW: PRIORITY + DEPARTMENT + DATE */}
                  <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">

                    {/* PRIORITY TAG (Rounded full, soft background) */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${priorityClasses}`}
                    >
                      {task.priority}
                    </span>

                    <div className="flex flex-col items-end">
                      {/* DEPARTMENT TAG (Soft grey pill) */}
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-100`}
                      >
                        {task.department.toUpperCase().replace('_', ' ')}
                      </span>
                      {/* CREATION DATE */}
                      <span className="text-gray-500 text-xs mt-1 pt-2">
                        <span className='font-medium text-gray-700'>Created:</span> {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* TASK TITLE (Clear and prominent) */}
                  <h2 className="text-xl font-extrabold text-blue-800 mb-3 leading-snug">
                    {task.task}
                  </h2>

                  {/* RAILWAY/COACH DETAILS SECTION: Clean separation, soft blue accent */}
                  <div className="border-t border-b border-blue-100 py-3 mb-4 bg-blue-50/50 p-3 rounded-md">
                    <p className="text-blue-700 font-bold text-sm mb-1 uppercase tracking-wider">
                      Coach Information
                    </p>
                    
                    {/* COACH ID */}
                    <div className='flex justify-between text-sm text-gray-700'>
                      <span className='font-medium'>Coach ID:</span>
                      <span className='font-bold text-blue-900'>{coachDetails.coachNumber}</span>
                    </div>

                    {/* COACH TYPE */}
                    <div className='flex justify-between text-sm text-gray-700 mt-0.5'>
                      <span className='font-medium'>Type:</span>
                      <span className='font-semibold'>{coachDetails.type}</span>
                    </div>
                  </div>

                  {/* DESCRIPTION (Main content area) */}
                  <p className="text-gray-700 mb-6 flex-grow text-sm">
                    <span className='font-semibold text-gray-800'>Issue Details:</span> {task.description}
                  </p>

                  {/* FOOTER WITH STATUS BUTTON */}
                  <div className="mt-auto pt-4 border-t border-gray-200 flex justify-center">
                    <button
                      onClick={() => deleteTask(task._id)}
                      // "Mark as Completed" button: Rounded, bold, deep green
                      className="flex items-center justify-center gap-2 w-full px-6 py-2 font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
                    >
                      {/* Checkmark Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Mark as Completed
                    </button>
                  </div>

                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTaskOutputForm