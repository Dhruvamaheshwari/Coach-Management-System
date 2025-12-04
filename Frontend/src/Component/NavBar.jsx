import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ isloggin, setIsloggin }) => {
    const location = useLocation();

    return (
        <div className="w-full bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LOGO */}
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/" className="hover:opacity-80 transition">
                        RailCoach
                    </Link>
                </div>

                {/* CENTER NAVIGATION */}
                <ul className="flex gap-6 items-center">
                    <li>
                        {isloggin && (
                            <Link
                                to="/home"
                                className={`px-3 py-2 rounded-lg text-sm transition ${location.pathname === "/home"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                                    }`}
                            >
                                Home
                            </Link>
                        )}
                    </li>

                    <li>
                        {isloggin && (
                            <Link
                                to="/maintenance"
                                className={`px-3 py-2 rounded-lg text-sm transition ${location.pathname === "/maintenance"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                                    }`}
                            >
                                Maintenance Tasks
                            </Link>
                        )}
                    </li>

                    <li>
                        {isloggin && (
                            <>
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-lg text-sm transition ${location.pathname === "/"
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                                        }`}
                                >
                                    Contact
                                </Link>

                            </>
                        )}
                        {isloggin && (
                            <>

                                <Link to="/coachprofile">
                                    <button className={`px-3 py-2 rounded-lg text-sm transition ${location.pathname === "/coachprofile"
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                                        }`}>
                                        Coach Profile
                                    </button>
                                </Link>
                            </>
                        )}
                    </li>
                </ul>

                {/* RIGHT SIDE AUTH BUTTONS */}
                <div className="flex items-center gap-4">

                    {/* LOGIN + SIGNUP Buttons (when NOT logged in) */}
                    {!isloggin && (
                        <>
                            <Link to="/login">
                                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white shadow">
                                    Login
                                </button>
                            </Link>

                            <Link to="/singup">
                                <button className="px-4 py-2 rounded-md border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition">
                                    Signup
                                </button>
                            </Link>
                        </>
                    )}

                    {/* LOGOUT + Coach Profile Buttons (when logged in) */}
                    {isloggin && (
                        <>
                            <Link to="/">
                                <button
                                    onClick={() => setIsloggin(false)}
                                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white shadow">
                                    Logout
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
