import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/saldo`;

export const getAllSaldo = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data.data;
};

export const getSaldoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.data;
};

export const createSaldo = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data.data;
};

export const updateSaldo = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
};

export const deleteSaldo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.data;
};

export const exportPDF = async ({ start, end }) => {
  const res = await axios.get(`${API_URL}/export/rekon/pdf?start=${start}&end=${end}`, {
    responseType: "blob", // supaya hasilnya blob (file)
  });

  // Buat blob url
  const fileURL = window.URL.createObjectURL(new Blob([res.data]));
  const fileLink = document.createElement("a");
  fileLink.href = fileURL;
  fileLink.setAttribute("download", "rekonsiliasi.pdf"); // nama file download
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove();
};
