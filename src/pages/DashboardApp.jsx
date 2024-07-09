import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import { useQuery } from '@tanstack/react-query';
import { fetchExam } from '../api/fechExam';

export default function DashboardApp() {
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: fetchExam,
  });

  if (isLoading) {
    return <div>Cargando exámenes...</div>;
  }

  if (error) {
    return <div>Error al cargar los exámenes. Por favor, inténtelo de nuevo más tarde.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No hay exámenes disponibles.</div>;
  }

  return (
    <div className="w-full h-full p-8 bg-[rgba(6,7,15,0.938)] backdrop-blur-lg">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 mt-8">
        {data.map((exam) => (
          <div key={exam._id} className="col-span-1">
            <Link to={`/SolutionExam/${exam._id}`}>
              <Cards
                title={exam.title}
                subtitle={`Nivel de inglés: ${exam.nivel}`}
                creador={`Creado por: ${exam.createdBy?.name}`} 
                description={exam.description}
                duration={'Duración: 1 hora'}
                gradient="bg-gradient-to-r from-gray-600 to-blue-700"
              />
              
            </Link>
          </div>
          
        ))}
      </div>
    </div>
  );
}
