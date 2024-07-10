import React, { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useMutation } from '@tanstack/react-query';
import { createVideo } from '../api/fetchVideo'; // Ajusta la ruta según sea necesario
import { Link } from 'react-router-dom';

function CreateVideos({ user }) {
    const {
        status,
        mediaBlobUrl,
        previewStream,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording
    } = useReactMediaRecorder({ video: true });

    const videoRef = useRef(null);
    const videoMutation = useMutation(createVideo);

    useEffect(() => {
        if (videoRef.current && previewStream) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    const postFormVideo = async (e) => {
        e.preventDefault();
        const resBlob = await fetch(mediaBlobUrl);
        const videoBlob = await resBlob.blob();

        const formData = new FormData();
        formData.append('title', e.target.title.value);
        formData.append('video', videoBlob);
        formData.append('user', user._id);

        videoMutation.mutate(formData, {
            onSuccess: (data) => {
                if (data && data.video) {
                    alert('Video subido exitosamente!');
                    console.log("Video subido exitosamente:", data);
                } else {
                    alert('Error al subir el video: No se recibieron datos del video');
                }
            },
            onError: (error) => {
                alert('Error al subir el video!');
                console.error("Error al subir el video:", error);
            }
        });
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
         
            <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={postFormVideo}>
            <Link to="/all">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Atras
            </span>
          </button>
        </Link>
                <h2 className="text-2xl font-bold text-MainSky mb-6 text-center">Crear Nuevo Video</h2>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        id="title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
                        type="text"
                        name="title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                    <input
                        id="description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
                        type="text"
                        name="description"
                    />
                </div>
                <input type="hidden" name="user" value={user._id} />
                {status === 'stopped' && (
                    <video src={mediaBlobUrl} className="h-[300px] w-full object-cover" controls autoPlay />
                )}
                {(status === 'recording' || status === 'paused') && (
                    <video ref={videoRef} className="h-[300px] w-full object-cover" controls autoPlay muted />
                )}
                <div className="flex justify-center items-center">
                    {status === 'idle' && (
                        <button
                            className="w-full bg-[#3a868f] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                            type="button"
                            onClick={startRecording}
                        >
                            Iniciar grabación
                        </button>
                    )}
                    {status === 'stopped' && (
                        <button
                            className="w-full bg-[#3a868f] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                            type="button"
                            onClick={startRecording}
                        >
                            Volver a grabar
                        </button>
                    )}
                    {status === 'paused' && (
                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                            onClick={resumeRecording}
                        >
                            Reanudar
                        </button>
                    )}
                    {(status === 'recording' || status === 'paused') && (
                        <>
                            <button
                                type="button"
                                className="w-full bg-yellow-600 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                                onClick={pauseRecording}
                            >
                                Pausar
                            </button>
                            <button
                                type="button"
                                className="w-full bg-red-400 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                                onClick={stopRecording}
                            >
                                Detener
                            </button>
                        </>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
                        type="reset"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CreateVideos;
