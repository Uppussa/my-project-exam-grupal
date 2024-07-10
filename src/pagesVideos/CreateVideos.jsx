import React, { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useMutation } from '@tanstack/react-query';
import { createVideo } from '../api/fetchVideo'; // Corrected import path for createVideo

function CreateVideos({ user }) {
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
    });

    const videoRef = useRef(null);
    const videoMutation = useMutation({
        mutationFn: createVideo, // Ensuring the mutation function is correctly assigned
    });

    useEffect(() => {
        if (videoRef.current && previewStream) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    const postFormVideo = async (e) => {
        e.preventDefault();
        const resBlob = await fetch(mediaBlobUrl);
        const videoBlob = await resBlob.blob();

        const formData = new FormData(e.target);
        formData.append('videos', videoBlob, 'videos'); // Use 'videos' as the field name
        videoMutation.mutate(formData, {
            onSuccess: (data) => {
                console.log("Video saved successfully:", data);
            },
            onError: (error) => {
                console.error("Error saving video:", error);
            }
        });
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={postFormVideo}>
                <h2 className="text-2xl font-bold text-MainSky mb-6 text-center">Create New Video</h2>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
                        type="text"
                        name="title"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-MainSky focus:border-transparent"
                        type="text"
                        name="description"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">Usuario:</label>
                    <input
                        type="text"
                        value={`${user?.name}`}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a868f] focus:border-transparent"
                    />
                    <input type="hidden" name="user" value={user?._id} />
                </div>
                {status === 'stopped' && (
                    <video src={mediaBlobUrl}
                        className="h-[300px] w-full object-cover"
                        controls
                        autoPlay>
                    </video>
                )}
                {(status === 'recording' || status === 'paused') && (
                    <video ref={videoRef}
                        className="h-[300px] w-full object-cover"
                        controls
                        autoPlay
                        muted>
                    </video>
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
                            onClick={resumeRecording} >
                            Reanudar
                        </button>
                    )}
                    {(status === 'recording' || status === 'paused') && (
                        <>
                            <button
                                type="button"
                                className="w-full bg-yellow-600 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                                onClick={pauseRecording} >
                                Pausar
                            </button>
                            <button
                                type="button"
                                className="w-full bg-red-400 hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                                onClick={stopRecording}>
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
