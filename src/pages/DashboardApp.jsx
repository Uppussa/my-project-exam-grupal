/* eslint-disable react/prop-types */
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import { useQuery } from '@tanstack/react-query';
import { fetchExam } from '../api/fechExam';
import { fetchVideo } from '../api/fetchVideo';
import { AuthContext } from '../context/UserContext'; // Importar el contexto de autenticación
import { useContext } from 'react';

export default function DashboardApp({ showVideos }) {
  const { user } = useContext(AuthContext); // Obtener el usuario actual del contexto de autenticación

  const examQuery = useQuery({
    queryKey: ['exams'],
    queryFn: fetchExam,
  });

  const videoQuery = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideo,
    enabled: showVideos,
  });

  if (examQuery.isLoading || (showVideos && videoQuery.isLoading)) {
    return <div>Cargando...</div>;
  }

  if (examQuery.error || (showVideos && videoQuery.error)) {
    return <div>Error al cargar los datos. Por favor, inténtelo de nuevo más tarde.</div>;
  }

  // Filtrar los videos por el usuario logueado
  const userVideos = videoQuery.data ? videoQuery.data.filter(video => video.user?._id === user?._id) : [];

  if (!userVideos.length && showVideos) {
    return (
      <div className="w-full h-full p-8  backdrop-blur-lg">
        <Navbar />
        <div className="flex justify-between mb-4 p-3">
          <Link to="/CreateVideos">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create Video
              </span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!examQuery.data || examQuery.data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div className="w-full h-full p-8 bg-[rgba(6,7,15,0.938)] backdrop-blur-lg">
      <Navbar />

      {showVideos && (
        <div className="flex justify-between mb-4 p-3">
          <Link to="/CreateVideos">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create Video
              </span>
            </button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-4 gap-8 mt-8">
        {showVideos ? userVideos.map(item => (
          <div key={item._id} className="col-span-1">
            <Link to={`/${showVideos ? 'videos' : 'SolutionExam'}/${item._id}`}>
              <Cards
                title={item.title}
                subtitle={showVideos ? `Creador: ${item.user?.name}` : `Nivel de inglés: ${item.nivel}`}
                description={item.description}
                gradient="bg-gradient-to-r from-gray-600 to-blue-700"
              />
            </Link>
          </div>
        )) : examQuery.data.map(item => (
          <div key={item._id} className="col-span-1">
            <Link to={`/${showVideos ? 'videos' : 'SolutionExam'}/${item._id}`}>
              <Cards
                title={item.title}
                subtitle={showVideos ? `Creador: ${item.user?.name}` : `Nivel de inglés: ${item.nivel}`}
                description={item.description}
                gradient="bg-gradient-to-r from-gray-600 to-blue-700"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
