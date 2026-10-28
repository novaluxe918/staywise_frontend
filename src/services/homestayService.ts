import api from "./api";

export const dangKyHomeStay = (formData : FormData) => {
    return api.post("/homestay/save", formData);
}