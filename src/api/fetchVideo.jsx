import axiosApi from "./axiosApi";

export const fetchVideo = async () => { 
    try {
        const res = await axiosApi.get("/videos");
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
    try {
        const res = await axiosApi.get(`/videos/${id}`);
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
    try {
        const res = await axiosApi.post('/videos/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on how you store the token
            },
        });

        if (res.status === 201) {
            return res.data;
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    } catch (error) {
        console.error("Error al crear el video:", error);
        return null;
    }
};