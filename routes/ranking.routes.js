import { Router } from "express";
import {
    newTime,
    findAll
} from "../controllers/ranking.controller.js";
const router = Router();

router.post("/ranking/add", newTime);

router.get("/ranking/all", findAll);

export default router;