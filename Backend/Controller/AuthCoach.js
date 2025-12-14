/** @format */

// to import the Coach Schema from the models -> coach.js
const Coach = require("../model/coach");

exports.CoachData = async (req, res) => {
    try {
        // to take the data from the body;
        const { coachNumber, type, depot, status, lastMaintenance, nextDue } = req.body;

        const EnterCoachNo = await Coach.findOne({ coachNumber });
        // to check the coach is present in the database or not
        if (EnterCoachNo)
            return res
                .status(400)
                .json({ succ: false, mess: "this coach is already exist" });

        const CoachCreate = await Coach.create({
            coachNumber,
            type,
            depot,
            status,
            lastMaintenance,
            nextDue,
        });
        return res
            .status(200)
            .json({ succ: true, coach: CoachCreate, mess: "coach is created" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ mess: err, suss: false });
    }
};

// to get all the coach data from the data base;
exports.allCoachData = async (req, res) => {
    try {
        const coaches = await Coach.find();
        res.status(200).json({ success: true, coaches });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
