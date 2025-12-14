/** @format */

import React, { useEffect, useRef, useState } from "react";

const MaintenanceTaskInputForm = ({ AddMaintenaceData }) => {
    const [showForm, setShowForm] = useState(false);

    // to show all the coach in the dropdown
    const [coachList, setCoachList] = useState([]);

    // GET ALL COACHES FROM DATABASE
    useEffect(() => {
        async function fetchCoaches() {
            try {
                const res = await fetch("http://localhost:4000/api/v1/allcoach");
                const data = await res.json();

                if (res.ok) {
                    setCoachList(data.coaches); // Save in state
                }
            } catch (err) {
                console.log("Fetch Coach Error:", err);
            }
        }

        fetchCoaches();
    }, []);

    // INPUT REFS
    let coach = useRef();
    let title = useRef();
    let priority = useRef();
    let department = useRef();
    let description = useRef();

    // SUBMIT HANDLER
    async function submitHandler(e) {
        e.preventDefault();

        // GET userId from localStorage
        let userId = localStorage.getItem("userId");
        console.log("User ID:", userId);

        // If no login → stop task creation
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
            assignedBy: userId, // Fixed
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
            {/* OPEN BUTTON */}
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
                + Create Task
            </button>

            {/* POPUP MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-[600px] rounded-2xl shadow-xl p-8 animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">
                            Create Maintenance Task
                        </h2>

                        <form onSubmit={submitHandler} className="space-y-5">
                            {/* SELECT COACH */}
                            <div>
                                <label className="text-gray-700 font-medium">
                                    Select Coach
                                </label>
                                <select
                                    name="coach"
                                    required
                                    ref={coach}
                                    className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- Select Coach --</option>
                                    {coachList.map((coach) => (
                                        <option key={coach._id} value={coach._id}>
                                            {coach.coachNumber} ({coach.type})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TASK TITLE */}
                            <div>
                                <label className="text-gray-700 font-medium">Task Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    ref={title}
                                    className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* PRIORITY */}
                            <div>
                                <label className="text-gray-700 font-medium">Priority</label>
                                <select
                                    name="priority"
                                    ref={priority}
                                    className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>

                            {/* DEPARTMENT */}
                            <div>
                                <label className="text-gray-700 font-medium">Department</label>
                                <select
                                    name="department"
                                    ref={department}
                                    className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Department</option>
                                    <option value="admin">Admin</option>
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

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-gray-700 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    ref={description}
                                    className="w-full mt-1 p-3 border rounded-lg bg-gray-50 h-28 focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
                                >
                                    Assign Task
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
