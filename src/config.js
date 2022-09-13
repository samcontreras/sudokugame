import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4001;
export const MONGODB_URI = "mongodb+srv://scontreras:Mongodb6891@cluster0.72vwjqz.mongodb.net/sudokugame?retryWrites=true&w=majority";
