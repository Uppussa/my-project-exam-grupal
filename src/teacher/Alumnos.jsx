import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [nombreNivel, setNombreNivel] = useState("");

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAlumnos(response.data);
      } catch (error) {
        setError("Error al obtener los estudiantes");
        console.error({ message: error.message });
      }
    };

    fetchAlumnos();
  }, []);

  const handleCancelar = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-7 h-[90%] rounded-3xl bg-white justify-center items-center px-16 py-14">
      <div className="w-full flex flex-col justify-center items-center text-slate-800 font-black text-4xl h-1/6">
        Estudiantes
      </div>
      <Link to="/all">
        <button className="relative block items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Back
          </span>
        </button>
      </Link>

      <div className="w-full h-5/6 justify-center items-center grid grid-cols-4 gap-8 overflow-y-auto">
        {error && <p>{error}</p>}
        {alumnos.length > 0 && alumnos.map((alumno) => (
          <div
            key={alumno._id}
            id={alumno._id}
            className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Nombre: {alumno.name}</h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">{alumno.
title}</p>
              <Link
                to={`/all/alumnos/${alumno._id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver video
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="w-full h-full bg-slate-600 bg-opacity-20 fixed flex items-center justify-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="m-8 flex gap-6 flex-col">
              <div className="flex items-center justify-center flex-col">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombrenivel">
                  Nombre del Nivel
                </label>
                <input
                  className="shadow appearance-none text-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombrenivel"
                  type="text"
                  placeholder="Ingrese el nombre..."
                  value={nombreNivel}
                  onChange={(e) => setNombreNivel(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Crear
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Alumnos;
