import React from "react";
import { Link } from "react-router-dom";

const CoachOutputForm = ({ AddCoach, CountCoachData }) => {
  // Count coach summary every render
  CountCoachData(AddCoach);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Coaches List</h1>

        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4">Coach Number</th>
              <th className="p-4">Type</th>
              <th className="p-4">Depot</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Maintenance</th>
              <th className="p-4">Next Due</th>
            </tr>
          </thead>

          <tbody>
            {AddCoach.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-5 text-center text-gray-500 border-t"
                >
                  No coaches added yet.
                </td>
              </tr>
            ) : (
              AddCoach.map((coach, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* CLICKABLE NUMBER */}
                  <td className="p-4">
                    <Link
                      to={`/coach/${index}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {coach.coachNumber}
                    </Link>
                  </td>

                  <td className="p-4">{coach.type}</td>
                  <td className="p-4">{coach.depot}</td>

                  <td className="p-4">
                    <span
                    // to show the all coach form the database
                      className={`px-3 py-1 rounded-full text-sm text-white 
    ${coach.status === "active"
                          ? "bg-green-500"
                          : coach.status === "under maintenance"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                    >
                      {coach.status}
                    </span>
                  </td>

                  <td className="p-4">{coach.lastMaintenance?.slice(0, 10)}</td>
                  <td className="p-4">{coach.nextDue?.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CoachOutputForm;
