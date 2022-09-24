import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/index", renderAbout);

export default router;
