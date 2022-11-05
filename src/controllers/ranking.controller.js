import Ranking from "../models/Ranking.js";

export const newTime=async(time,difficulty,user)=>{
    const timeRank= new timeRank({
        "time":time,
        "difficulty":difficulty,
        "user": user,
    });

    let timeRanking= await newTime.save();
    return {timeRanking};
};

export const getAlltimers = async(limit,offset)=>{
    const timers= await timeRank.find({}).limit(limit).skip(offset);
    return timers;
};

export const getTimer= async(limit,user)=>{
    const time= await timeRank.find({"user":user}).limit.sort("time");
    return time;
}

