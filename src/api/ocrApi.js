import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/ocr`;

//import fileimage dengan formdata
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${API_URL}/read-saldo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
    throw new Error("Gagal mengunggah file");
  }
};