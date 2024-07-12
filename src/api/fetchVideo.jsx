import axiosApi from './axiosApi';

export const fetchVideo = async () => { 
    const token = localStorage.getItem('token');
    try {
        const res = await axiosApi.get("/videos", {headers: { Authorization: `Bearer ${token}`}});
        // headers: {
        //     Authorization: `Bearer ${token}`;
        // }
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    } catch (error) {
        console.error("Error al cargar los videos:", error);
        return [];
    }
};

export const fetchVideoById = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axiosApi.get(`/videos/${id}`, {headers: { Authorization: `Bearer ${token}`}});
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createVideo = async (formData) => {
    const token = localStorage.getItem('token');
    const res = await axiosApi.post('/videos/new', formData, {headers: {Authorization: `Bearer ${token}`}});
    console.log(res)
    return res.data;
    // try {
    //     const res = await axiosApi.post('/videos/new', formData);
    //     console.log(res)

    //     if (res.status === 201) {
    //         return res.data;
    //     } else {
    //         throw new Error(`Error: ${res.status}`);
    //     }
    // } catch (error) {
    //     console.error("Error al crear el video:", error);
    //     throw error; // Re-lanzar el error para que pueda ser manejado por el componente
        
    // }
};