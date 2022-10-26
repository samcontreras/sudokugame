import Ranking from "../models/Ranking.js";
import { renderNoteForm } from "./notes.controller";

export const renderNoteForm=(req,res)=>res.resnder("ranking/fullrank");
export const renderRanking=async(req,res)=>{
    Ranking.aggregate([{
        $setWindowFields:{
            partitionBy:"$dificulty",
            sortby:{timer:1},
            output:{
                rankQuantityForDifficulty:{
                    $rank:{
                    }
                }
            }
        }
    }])
};
