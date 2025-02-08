import express from "express";
import {
    deleteItemFromHistory,
    getSearchHistory,
    saveSearchHistory,
    searchMovie,
    searchPerson,
    searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);
router.post("/savecontent/:media/:id", saveSearchHistory);
router.delete("/history/:id", deleteItemFromHistory);

export default router;
