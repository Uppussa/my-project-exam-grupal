import axiosApi from "./axiosApi";

export const fetchExam = async () => {
  try {
    const res = await axiosApi.get("/exams");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Error: ${res.status}`);
    }
  } catch (error) {
    console.error("Error al cargar el examen:", error);
    return [];
  }
};

export const fetchExamById = async (id) => {
  try {
    const res = await axiosApi.get(`/exams/${id}`);
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


export const createExam = async (exam) => {
  try {
    console.log('Sending exam data:', exam);
    const res = await axiosApi.post("/exams/new", exam);
    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Error: ${res.status}`);
    }
  } catch (error) {
    console.error("Error al crear el examen:", error);
    return null;
  }
};