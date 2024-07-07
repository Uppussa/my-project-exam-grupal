import React from "react";
import images from '../assets/images.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function Navbar() {
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
          <h4 className="text-lg font-bold">Kishan Sheth</h4>
          <h6 className="text-green-500">Online</h6>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <IoMdNotificationsOutline className="text-2xl" />
        <FiMail className="text-2xl" />

      </div>
    </div>
  );
}
