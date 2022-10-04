import mongoose from "mongoose";

const sudokuSchema = new mongoose.Schema(
  {
    Partida_Nro: {
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

export default mongoose.model("Sudoku", sudokuSchema);
