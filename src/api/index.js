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

export const apiSongSubmit = async (song) => {
    try {
        const results = await axios.post(`${baseUrl}/api/songs`, song);
        return results;
    } catch (error) {
        return null
    }
};