// to import the task Schema from the models -> task.js
const Task = require('../model/task')


exports.TaskData = async (req, res) => {
    try {
        // to take the data from the body;
        const { selectCoach, task, priority, department, assignedBy, description } = req.body;

        const CreateTask = await Task.create({ selectCoach, task, priority, department, assignedBy, description })
        return res.status(200).json({ succ: true, coach: CreateTask, mess: 'coach is created' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ mess: err, suss: false });
    }
}

// to get all the task 
exports.AllTask = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("selectCoach")      // get full Coach info
            .populate("assignedBy");      // get full User info

        return res.status(200).json({
            succ: true,
            tasks
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ mess: err.message, succ: false });
    }
}
