import React from 'react';
import images from '../assets/images.png';
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <div className="container mx-auto bg-white rounded mt-5 mb-5 p-5">
      <div className="flex">
        <div className="w-1/4 border-r">
          <div className="flex flex-col items-center text-center p-3 py-5">
          <Link to="/">
            <span className="text-blue-500 mb-4">← Back </span>
          </Link>
            <img
              className="rounded-full mt-5 w-36 h-36"
              src={images}
              alt="Profile"
            />
            <span className="font-semibold">Edogaru</span>
            <span className="text-gray-500">edogaru@mail.com.my</span>
          </div>
        </div>
        <div className="w-1/2 border-r">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-sm">Name</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="first name" />
              </div>
              
            </div>
            <div className="grid grid-cols-1 gap-4 mt-3">
              <div>
                <label className="text-sm">Mobile Number</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="enter phone number" />
              </div>
              
              <div>
                <label className="text-sm">State</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="enter state" />
              </div>
              <div>
                <label className="text-sm">Area</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="enter area" />
              </div>
              <div>
                <label className="text-sm">Email ID</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="enter email id" />
              </div>
              <div>
                <label className="text-sm">Education</label>
                <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="education" />
              </div>
            </div>

            <div className="text-center mt-5">
              <button className="btn bg-purple-700 text-white py-2 px-4 rounded focus:outline-none hover:bg-purple-800">Save Profile</button>
            </div>
          </div>
        </div>
        {/* <div className="w-1/4">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center experience">
              <span>Edit Experience</span>
              <span className="border px-3 p-1 add-experience cursor-pointer">
                <i className="fa fa-plus"></i>&nbsp;Experience
              </span>
            </div>
            <br />
            <div className="mt-2">
              <label className="text-sm">Experience in Designing</label>
              <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="experience" />
            </div>
            <br />
            <div className="mt-2">
              <label className="text-sm">Additional Details</label>
              <input type="text" className="form-control mt-1 p-2 border rounded" placeholder="additional details" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Setting;
