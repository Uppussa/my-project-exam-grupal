import axiosApi from "./axiosApi";

export const fetchUser = async () => {
    try {
        const res = await axiosApi.get("/users");
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        return [];
    }
}

export const fetchUserById = async (id) => {
    try {
        const res = await axiosApi.get(`/users/${id}`);
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

