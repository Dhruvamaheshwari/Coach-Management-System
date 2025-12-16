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

// to delete the Task;
exports.DeleteTask = async (req, res) => {
  try {
    //! patams se isliye liya h kyuki hum isme axious use kr rhe h to vo data url se send krta h ;
    const { id } = req.params;
    console.log(req.params)

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Task is not deleted",
    });
  }
};

