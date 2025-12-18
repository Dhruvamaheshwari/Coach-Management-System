/** @format */

import React, { useEffect, useRef, useState } from "react";

const MaintenanceTaskInputForm = ({ AddMaintenaceData ,coachList , setCoachList}) => {
    const [showForm, setShowForm] = useState(false);

    // GET ALL COACHES FROM DATABASE (Logic remains the same)
    useEffect(() => {
        async function fetchCoaches() {
            try {
                const res = await fetch("http://localhost:4000/api/v1/allcoach");
                const data = await res.json();

                if (res.ok) {
                    setCoachList(data.coaches);
                }
            } catch (err) {
                console.log("Fetch Coach Error:", err);
            }
        }
        fetchCoaches();
    }, []);

    // INPUT REFS (Refs remain the same)
    let coach = useRef();
    let title = useRef();
    let priority = useRef();
    let department = useRef();
    let description = useRef();

    // SUBMIT HANDLER (Logic remains the same)
    async function submitHandler(e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User not logged in. Please login again.");
            return;
        }

        let MaintenanceData = {
            selectCoach: coach.current.value,
            task: title.current.value,
            priority: priority.current.value,
            department: department.current.value,
            description: description.current.value,
            assignedBy: userId,
        };

        try {
            const res = await fetch("http://localhost:4000/api/v1/taskdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(MaintenanceData),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Task is not created");
                return;
            }

            AddMaintenaceData(MaintenanceData);
            setShowForm(false);
            alert("Task is created");

        } catch (err) {
            console.error("Task Error:", err);
        }
    }

    return (
        <>
            {/* BUTTON: RENDERED AS A CHILD, STYLED FOR THE MODERN HEADER */}
            <button
                onClick={() => setShowForm(true)}
                // Modern, primary blue button style: Soft blue background, rounded-lg
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Assign New Task
            </button>

            {/* POPUP MODAL: Modernized to match the reference UI's lightness and rounding */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
                        
                        {/* Modal Header: Clean and sharp */}
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
                            Maintenance Request Form
                        </h2>

                        <form onSubmit={submitHandler} className="space-y-5">
                            {/* Input Fields: Using soft light gray background and rounded corners */}
                            
                            {/* SELECT COACH */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1 block text-sm">Coach Identification</label>
                                <select
                                    name="coach"
                                    required
                                    ref={coach}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
                                >
                                    <option value="">-- Select Coach ID --</option>
                                    {coachList.map((coach) => (
                                        <option key={coach._id} value={coach._id}>
                                            {coach.coachNumber} ({coach.type})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TASK TITLE */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1 block text-sm">Task Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    ref={title}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
                                    placeholder="e.g., Check Wheel Alignment on Bogie 2"
                                />
                            </div>

                            {/* PRIORITY & DEPARTMENT in a two-column grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* PRIORITY */}
                                <div>
                                    <label className="text-gray-700 font-medium mb-1 block text-sm">Priority</label>
                                    <select
                                        name="priority"
                                        required
                                        ref={priority}
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
                                    >
                                        <option value="low">Low - Routine</option>
                                        <option value="medium">Medium - Scheduled</option>
                                        <option value="high">High - Immediate Attention</option>
                                        <option value="critical">Critical - Safety Hazard</option>
                                    </select>
                                </div>

                                {/* DEPARTMENT */}
                                <div>
                                    <label className="text-gray-700 font-medium mb-1 block text-sm">Department</label>
                                    <select
                                        name="department"
                                        required
                                        ref={department}
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="mechanical">Mechanical</option>
                                        <option value="electrical">Electrical</option>
                                        <option value="signal_telecom">Signal & Telecom</option>
                                        <option value="carriage_wagon">Carriage & Wagon</option>
                                        <option value="traction">Traction</option>
                                        <option value="operations">Operations</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="railway_safety">Railway Safety</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1 block text-sm">Detailed Description</label>
                                <textarea
                                    name="description"
                                    required
                                    ref={description}
                                    rows="3"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150 resize-none"
                                    placeholder="Describe the fault, exact location (e.g., Coach B1, Seat 45), and any immediate observations."
                                ></textarea>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    // Secondary button: White background, blue text
                                    className="px-6 py-2 text-blue-600 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    // Primary button: Blue background
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MaintenanceTaskInputForm;