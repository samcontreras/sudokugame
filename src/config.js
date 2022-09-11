import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://scontreras:Mongodb6891@cluster0.72vwjqz.mongodb.net/sudokugamedb?retryWrites=true&w=majority";
