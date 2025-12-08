
// to import the Coach Schema from the models -> coach.js
const Coach = require('../model/coach')

exports.CoachData = async (req, res) => {

    try {
        // to take the data from the body;
        const { coachNo, coachtype, depot, satus, lasrMaintenace, nextDueDate } = req.body;

        const EnterCoachNo = await Coach.findOne({ coachNo })
        // to check the coach is present in the database or not
        if (EnterCoachNo)
            return res.status(400).json({ succ: false, mess: "this coach is already exist" });

        const CoachCreate = await Coach.create({ coachNo, coachtype, depot, satus, lasrMaintenace, nextDueDate })
        return res.status(200).json({ succ: true, coach: CoachCreate, mess: 'coach is created' });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ mess: err, suss: false });
    }
}

