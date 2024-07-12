import React, { useEffect, useRef, useContext, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../context/UserContext';
import { createVideo } from '../api/fetchVideo';
import { useNavigate } from 'react-router-dom';
import Record from '../components/Record';

function CreateVideos() {
    const [isReady, setIsReady] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const videoMutation = useMutation({
        mutationFn: createVideo,
        onSuccess: () => {
            alert('Video subido exitosamente');
            // navigate('/all');
        },
        onError: (error) => {
            console.error('Error al subir el video:', error);
            // alert('Error al subir el video. Por favor, inténtelo de nuevo.');
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const {
        status,
        mediaBlobUrl,
        previewStream,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording
    } = useReactMediaRecorder({
        video: true,
        // onStop: (blobUrl) => {
        //     console.log('Grabaci ón detenida:', blobUrl);
        // },
        // onError: (error) => {
        //     console.error('Error en la grabación:', error);
        // }
    });

    useEffect(() => {
        if (videoRef.current && previewStream) {
          videoRef.current.srcObject = previewStream;
        }
      }, [previewStream]);

    const postFormVideo = async e => {
        e.preventDefault();
        const resBlob = await fetch(mediaBlobUrl);
        const videoBlob = await resBlob.blob();
        // console.log(videoBlob)

        const data = new FormData(e.target);
        data.append('video', videoBlob, 'video.mp4');
        // data.append('title', e.target.title.value); // Asegúrate de capturar el título desde el formulario
        // data.append('user', user._id); // Asegúrate de capturar el ID de usuario desde el contexto

        await videoMutation.mutateAsync(data);
        // try {
        // } catch (error) {
        //     console.error('Error al subir el video:', error);
        //     alert('Error al subir el video. Por favor, inténtelo de nuevo.');
        // }
    };
    

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <div>Por favor, inicia sesión para crear un video.</div>;
    }

    if (!isReady) {
        return <div>Preparando el grabador...</div>;
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={postFormVideo}>
                <h2 className="text-2xl font-bold text-MainSky mb-6 text-center">Crear Nuevo Video</h2>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
                        type="text"
                        name="title" />
                </div>
                <div className="mb-6">
                    <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Usuario:</label>
                    <input
                        type="text"
                        value={`${user.name}`}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a868f] focus:border-transparent"
                    />
                    <input type="hidden" name="user" value={user._id} />
                </div>
                <Record
                    status={status}
                    mediaBlobUrl={mediaBlobUrl}
                    startRecording={startRecording}
                    resumeRecording={resumeRecording}
                    pauseRecording={pauseRecording}
                    stopRecording={stopRecording}
                    videoRef={videoRef} />

                <div className="flex justify-between items-center mt-6">
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
                        onClick={() => navigate('/all')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CreateVideos;
