import mongoose from "mongoose";

const SudokuSchema = new mongoose.Schema(
  {
    Nropartida: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Sudoku", SudokuSchema);
