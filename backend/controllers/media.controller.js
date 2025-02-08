import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMedia = async (req, res) => {
    const { type } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
        );
        const randomMedia =
            data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMedia });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMediaTrailers = async (req, res) => {
    const { type } = req.params;
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
        );
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMediaDetails = async (req, res) => {
    const { type } = req.params;
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
        );
        res.json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSimilarMedias = async (req, res) => {
    const { type } = req.params;
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
        );
        res.json({ success: true, similar: data.results });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMediasByCategory = async (req, res) => {
    const { type } = req.params;
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
        );
        res.json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
