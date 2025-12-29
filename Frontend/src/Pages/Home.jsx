/** @format */

import React, { useMemo, useEffect } from "react";
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaTrain,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import "../AllCSS/Home.css";

const Home = ({
  TotalCoach = 150,
  ActiveCoach = 120,
  MaintenanceDueCoach = 15,
  OutOfSericeCoach = 15,
}) => {



  // MEMOIZED CHART DATA (KEY FOR SMOOTH ANIMATION)
  const chartData = useMemo(
    () => [
      { name: "Active", value: ActiveCoach },
      { name: "Maintenance", value: MaintenanceDueCoach },
      { name: "Out of Service", value: OutOfSericeCoach },
    ],
    [ActiveCoach, MaintenanceDueCoach, OutOfSericeCoach]
  );




  return (
    <>

      <div className="dashboard-bg min-h-screen p-8">
        {/* Decorative Track Line */}
        <div className="track-line">

        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ================= HEADER ================= */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Coach Management{" "}
              <span className="text-sky-400">Dashboard</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Professional fleet monitoring system
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ================= STAT CARDS ================= */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard
                title="Total Fleet"
                value={TotalCoach}
                icon={<FaTrain />}
                accent="bg-blue-500"
              />

              <StatCard
                title="Active"
                value={ActiveCoach}
                icon={<FaCheckCircle />}
                accent="bg-emerald-500"
              />

              <StatCard
                title="Maintenance"
                value={MaintenanceDueCoach}
                icon={<FaTools />}
                accent="bg-amber-500"
              />

              <StatCard
                title="Out of Service"
                value={OutOfSericeCoach}
                icon={<FaExclamationTriangle />}
                accent="bg-rose-500"
              />
            </div>

            {/* ================= CHART ================= */}
            <div className="lg:col-span-5 stat-card-glass p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Fleet Status Overview
                </h3>
                <span className="text-xs text-slate-400">Live Data</span>
              </div>

              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%" debounce={200}>
                  <BarChart data={chartData} barSize={48} isAnimationActive>

                    {/* Gradient */}
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="4 4"
                      stroke="#1e293b"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#cbd5f5"
                      fontSize={13}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      isAnimationActive={false}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{
                        background: "rgba(15,23,42,0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        color: "#fff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                      }}
                      labelStyle={{
                        color: "#38bdf8",
                        fontWeight: "600",
                      }}
                    />

                    <Bar
                      dataKey="value"
                      fill="url(#barGradient)"
                      radius={[12, 12, 4, 4]}
                      animationDuration={1400}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ================= STAT CARD =================
const StatCard = ({ title, value, icon, accent }) => (
  <div className="stat-card-glass p-6 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h2 className="text-3xl font-bold mt-2 text-white">{value}</h2>
      </div>

      <div
        className={`p-3 rounded-xl text-white text-xl ${accent} 
                    shadow-lg transition-transform duration-300 
                    group-hover:scale-110`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default Home;
