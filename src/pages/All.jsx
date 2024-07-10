import React from 'react';
import DashboardApp from './DashboardApp';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';

function All() {
  const { user } = useContext(AuthContext);
  console.log('user', user);

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
