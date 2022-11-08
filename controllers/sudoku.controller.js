import Sudoku from "../models/Sudoku.js";

export const renderNoteForm = (req, res) => res.render("sudoku/all-partidas");

export const renderSudoku= async (req, res) => {
  const sudoku = await Sudoku.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("sudoku/all-partidas", { sudoku });
};


