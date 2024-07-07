import React from 'react';
import DashboardApp from './DashboardApp';
import Sidebar from '../components/Sidebar';


function All() {
  return (
    <>
      <div className="grid grid-cols-[350px_1fr] h-screen">
        <Sidebar /> 
        <DashboardApp />
      </div>
     
    </>
  );
}

export default All;
