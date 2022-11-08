import Ranking from "../models/Ranking.js";

export const newTime = async(req, res) => {
    try {
        const { time, difficuty, user } = req.body;
        const timeRank = {
            "time": time,
            "difficuty": difficuty,
            "user": user,
        };
        const cant = await Ranking.count();
        if (cant < 10) {
            const newRanking = new Ranking(timeRank);
            const savedRanking = await newRanking.save();
            return res.status(201).json(savedRanking);
        }
        const moreTimeRanking = await Ranking.find().sort({ time: -1 }).limit(1);
        if (time < moreTimeRanking[0].time) {
            const updatedRanking = await Ranking.findByIdAndUpdate(moreTimeRanking[0]._id, {
                ...timeRank
            }, { new: true });
            return res.status(201).json(updatedRanking);
        }
        return res.status(400).json({ error: 'No se supera ningun ranking' });
    } catch (e) {
        return res.status(500).json({ error: 'Internal Server error' });
    }
};

export const findAll = async(req, res) => {
    try {
        const ranking = await Ranking.find().sort({ time: 1 });
        return res.status(200).json(ranking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server error' });
    }
}