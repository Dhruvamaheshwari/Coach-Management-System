import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isloggin, setIsloggin }) => {
    const location = useLocation();

    //! this is for the delete the cookis
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:4000/api/v1/logout",
                {},
                { withCredentials: true }
            );

            localStorage.removeItem("isLoggedIn");
            setIsloggin(false);
            navigate("/");
        } catch (err) {
            console.log("Logout error", err);
        }
    };

    // Helper function for link styling to avoid duplication
    const getLinkClasses = (path) => `
        py-2 text-sm font-semibold tracking-wide transition-colors duration-200 relative 
        ${location.pathname === path
            ? "text-white border-b-2 border-blue-500" // Active state: Blue underline
            : "text-gray-400 hover:text-white" // Inactive state
        }
    `;

    return (
        // UI CHANGE: Dark background, strong shadow, modern height
        <div className="w-full bg-gray-900 text-white shadow-xl sticky top-0 z-50 ">
            {/* CONTAINER: Centered and aligned */}
            <nav className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">

                {/* LOGO (Structure preserved, UI updated with railway icon) */}
                <div className="flex items-center gap-3">
                    {/* UI CHANGE: Added Railway Coach Icon for theme */}
                    <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11v2h2V9h-2zm0 4v2h2v-2h-2zM7 11v2h2v-2H7zm0 4v2h2v-2H7zm10-4v2h-2V9h2zm0 4v2h-2v-2h2z"/>
                    </svg>
                    <Link to="/" className="text-2xl font-extrabold tracking-wide hover:opacity-90 transition">
                        RailCoach
                    </Link>
                </div>

                {/* CENTER NAVIGATION (ORDER STRICTLY PRESERVED, UI updated with clean active state) */}
                <ul className="flex gap-8 items-center">
                    <li>
                        {isloggin && (
                            <Link to="/home" className={getLinkClasses("/home")}>
                                Home
                            </Link>
                        )}
                    </li>

                    <li>
                        {isloggin && (
                            <Link to="/maintenance" className={getLinkClasses("/maintenance")}>
                                Maintenance Tasks
                            </Link>
                        )}
                    </li>

                    <li>
                        {isloggin && (
                            <>
                                <Link to="/" className={getLinkClasses("/")}>
                                    About Us
                                </Link>
                            </>
                        )}
                    </li>
                        {/* Note: The next two links were originally inside an extra 'isloggin' block, 
                           I'm keeping them exactly where they were in the original list item (li) structure. */}
                           
                        {isloggin && (
                            <>
                                <Link to="/coachprofile" className={getLinkClasses("/coachprofile")}>
                                    Coach Profile
                                </Link>

                                <Link to="/departments" className={getLinkClasses("/departments")}>
                                    departments Profile
                                </Link>
                            </>
                        )}
                        
                    
                </ul>

                {/* RIGHT SIDE AUTH BUTTONS (ORDER STRICTLY PRESERVED, UI updated for CTA styling) */}
                <div className="flex items-center gap-4">

                    {/* LOGIN + SIGNUP Buttons (when NOT logged in) */}
                    {!isloggin && (
                        <>
                            <Link to="/login">
                                {/* UI CHANGE: Bold, primary blue button style */}
                                <button className="px-5 py-2 rounded-md bg-blue-600 font-semibold hover:bg-blue-700 transition text-white shadow-md">
                                    Login
                                </button>
                            </Link>

                            <Link to="/singup">
                                {/* UI CHANGE: Secondary button, bold text, dark background contrast */}
                                <button className="px-5 py-2 rounded-md border-2 border-blue-500 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition">
                                    Signup
                                </button>
                            </Link>
                        </>
                    )}

                    {/* LOGOUT Button (when logged in) */}
                    {isloggin && (
                        <>
                            <button
                                onClick={handleLogout}
                                // UI CHANGE: Prominent red button style with icon
                                className="px-5 py-2 rounded-md bg-red-600 font-semibold hover:bg-red-700 transition text-white shadow-md flex items-center gap-1">
                                    {/* UI CHANGE: Logout Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm10.707 3.293a1 1 0 010 1.414L11.414 9H16a1 1 0 110 2h-4.586l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;