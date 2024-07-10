import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchVideoById } from "../api/fetchVideo";

function SelectVideos() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isError, isLoading } = useQuery({
        queryKey: ['videos', id],
        queryFn: () => fetchVideoById(id),
    });

    if (isError) {
        navigate('/all');
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-semibold text-MainSky">Cargando información...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-semibold text-red-500">No se encontraron datos</p>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
            <Link to="/all">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Atras
            </span>
          </button>
        </Link>
            <section className="mb-8">
                <video
                    src={`http://localhost:3000/videos/content/${id}`}
                    controls
                    autoPlay
                    className="w-full rounded-lg shadow-md"
                ></video> 
            </section>
            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-[#3a868f]">{data.title}</h1>
                <p className="text-lg text-gray-700">Usuario: <span className="font-semibold">{data.user?.name}</span></p>
            </section>
            <section className="flex justify-end items-center gap-4">
                <button className="px-6 py-3 bg-[#3a868f] hover:bg-opacity-80 text-white rounded-lg font-bold shadow-md transition duration-300">
                    Editar
                </button>
                <button className="px-6 py-3 bg-red-500 hover:bg-opacity-80 text-white rounded-lg font-bold shadow-md transition duration-300">
                    Eliminar
                </button>
            </section>
        </main>
    );
}

export default SelectVideos;
