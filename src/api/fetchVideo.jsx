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
        console.log('Sending video data:', video);
        const res = await axiosApi.post("/videos/new", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }   
        );
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