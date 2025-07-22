import OverallStat from '../models/OverallStat.js';

export const getSales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find();
        res.status(200).json(overallStat[0]);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};
