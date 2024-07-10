import React from 'react';
import DashboardApp from './DashboardApp';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { useState } from 'react';

function All() {
  const { user } = useContext(AuthContext);
  console.log('user', user);


  const [showVideos, setShowVideos] = useState(false);
  return (
    <>
      <div className="grid grid-cols-[350px_1fr] h-screen">
      <Sidebar setShowVideos={setShowVideos} />
      <DashboardApp showVideos={showVideos} />
      </div>
     
    </>
  );
}

export default All;
