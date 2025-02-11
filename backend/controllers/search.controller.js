import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in searchPerson controller", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in searchMovie controller", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchTv = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in searchTv controller", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const saveSearchHistory = async (req, res) => {
    const { id } = req.params;
    const { media } = req.params;

    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );

        const isAlreadySaved = req.user.searchHistory.some(
            (content) => content.id === response.id
        );

        if (!isAlreadySaved) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.id,
                        image: response.poster_path || response.profile_path,
                        title: response.title || response.name,
                        searchType: media,
                        createdAt: new Date(),
                    },
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "Content saved to history",
        });
    } catch (error) {
        console.error("Error in saveSearchHistory controller", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            content: req.user.searchHistory,
        });
    } catch (error) {
        console.error("Error in getSearchHistory controller", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteItemFromHistory = async (req, res) => {
    let { id } = req.params;

    id = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });

        res.status(200).json({
            success: true,
            message: "Item removed from search history",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
