import { Router } from "express";
import { renderIndex, renderAbout, renderSudoku, renderRanking } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/sudoku", renderSudoku);
router.get("/ranking", renderRanking);

export default router;
