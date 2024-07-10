import React from "react";
import classImage from "../assets/class.jpg"; // Ajusta la ruta según sea necesario
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Sidebar() {
  // Función para obtener el rol del token
  const getRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const role = getRoleFromToken();

  return (
    <div className="sidebar w-[350px] h-full flex flex-col justify-between bg-blue-500 text-white" style={{
      backgroundImage: `url(${classImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 0.9,
    }}>
      <div className="brand bg-gray-600 h-9 flex justify-center items-center">
        <h2 className="font-black tracking-wider">
          Fun<span className="text-pink-600 font-black">val</span>
        </h2>
      </div>
      <div className="mt-8 ml-[115px]">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Dashboard
          </span>
        </button>
        <Link to="/CreateVideos">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              My videos
            </span>
          </button>
        </Link>
      </div>
      <div className="flex justify-center mb-8 h-16"> {/* Añade una altura fija aquí */}
        {role === 'teacher' && (
          <Link to="CreateExamForm">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create New Exam
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
