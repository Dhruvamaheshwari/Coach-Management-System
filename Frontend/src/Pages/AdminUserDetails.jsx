/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasksCompleted, setTasksCompleted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // fetch user details
    fetch(`http://localhost:4000/api/v1/admin/users/${id}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.user) setUser(data.user);
        else if (data.user) setUser(data.user);
      })
      .catch((e) => console.error("fetch user error", e))
      .finally(() => setLoading(false));

    // fetch tasks completed (graceful fallback if endpoint doesn't exist)
    fetch(`http://localhost:4000/api/v1/admin/users/${id}/tasks/count`, {
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error("no tasks count endpoint");
        return r.json();
      })
      .then((d) => {
        if (d && typeof d.count !== "undefined") setTasksCompleted(d.count);
      })
      .catch(() => setTasksCompleted(null));
  }, [id]);

  function formatWorkTime(ms) {
    if (!ms || ms <= 0) return "0s";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user)
    return (
      <div className="p-6">
        <p>User not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-sm text-slate-300">{user.email}</p>
            <p className="mt-2 text-sm">
              <strong>Role:</strong> {user.role}
            </p>
          </div>

          <div className="text-right">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 rounded bg-slate-700/60">
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-slate-200">
          <div className="bg-white/3 rounded p-4">
            <div className="mb-2 text-slate-300">Login Time</div>
            <div className="font-medium">
              {user.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString()
                : "-"}
            </div>
          </div>

          <div className="bg-white/3 rounded p-4">
            <div className="mb-2 text-slate-300">Logout Time</div>
            <div className="font-medium">
              {user.lastLogoutAt
                ? new Date(user.lastLogoutAt).toLocaleString()
                : user.status === "online"
                ? "Online"
                : "-"}
            </div>
          </div>

          <div className="bg-white/3 rounded p-4">
            <div className="mb-2 text-slate-300">Total Work</div>
            <div className="font-medium">
              {formatWorkTime(user.totalWorkTime)}
            </div>
          </div>

          <div className="bg-white/3 rounded p-4">
            <div className="mb-2 text-slate-300">Tasks Completed</div>
            <div className="font-medium">
              {tasksCompleted === null ? "N/A" : tasksCompleted}
            </div>
          </div>
        </div>

        <div className="mt-6 text-slate-300">
          <h3 className="text-sm font-semibold mb-2">Raw details</h3>
          <pre className="text-xs bg-black/30 p-3 rounded overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
