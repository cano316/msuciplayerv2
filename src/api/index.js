import axios from "axios";

const baseUrl = "http://localhost:8000"

export const getAllSongs = async () => {
    try {
        const results = await axios.get(`${baseUrl}/api/songs`)
        return results.data;
    } catch (error) {
        return null
    }
};

export const apiSongSubmit = async (formData) => {
    try {
        const results = await axios.post(`${baseUrl}/api/songs`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return results;
    } catch (error) {
        return error
    }
};