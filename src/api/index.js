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

export const addSong = async (song) => {
    try {
        const results = await axios.post(baseUrl, song);
        return results.data;
    } catch (error) {

    }
}