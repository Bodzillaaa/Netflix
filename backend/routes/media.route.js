import express from "express";
import {
    getMediaDetails,
    getMediasByCategory,
    getMediaTrailers,
    getSimilarMedias,
    getTrendingMedia,
} from "../controllers/media.controller.js";
import { validateType } from "../middlewares/validateType.js";

const router = express.Router();

router.get("/:type/trending", validateType, getTrendingMedia);
router.get("/:type/:id/trailers", validateType, getMediaTrailers);
router.get("/:type/:id/details", validateType, getMediaDetails);
router.get("/:type/:id/similar", validateType, getSimilarMedias);
router.get("/:type/:category", validateType, getMediasByCategory);

export default router;
