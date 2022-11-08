import { Router } from "express";
import { renderIndex, renderAbout, renderSudoku } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/sudoku", renderSudoku);

export default router;
