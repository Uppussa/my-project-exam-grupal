import React, { useContext } from "react";
import images from '../assets/images.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } 
  }

  return (
    <div className="flex justify-between items-center text-white p-4 rounded-lg shadow-2xl relative overflow-hidden bg-gradient-to-r from-gray-600 to-blue-700">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Link to="/Setting">
            <a className="flex items-center whitespace-nowrap transition duration-150 ease-in-out" href="#" role="button">
              <img
                src={images}
                className="rounded-full"
                style={{ height: "40px", width: "40px" }}
                alt="Profile"
                loading="lazy"
              />
            </a>
          </Link>
        </div>
        <div className="info">
          <h4 className="text-lg font-bold">{user?.name}</h4> {/* Mostrar el nombre del usuario */}
          <h6 className="text-green-500">Online</h6>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <IoMdNotificationsOutline className="text-2xl" />
        <button
          className="block w-full rounded-xl whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 dark:bg-surface-dark dark:text-black dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
