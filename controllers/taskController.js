import Task from '../models/taskModels.js';


export const createTask = async (req, res) => {
try {
const { title, description } = req.body;
if (!title) return res.status(400).json({ message: 'Title is required' });
const task = await Task.create({ title, description, user: req.user._id });
return res.status(201).json(task);
} catch (error) {
return res.status(500).json({ message: 'Server error' });
}
};


export const getTasks = async (req, res) => {
try {
const tasks = await Task.find({ user: req.user._id }).sort('-createdAt');
return res.json(tasks);
} catch (error) {
return res.status(500).json({ message: 'Server error' });
}
};


export const updateTask = async (req, res) => {
try {
const { id } = req.params;
const updated = await Task.findOneAndUpdate(
{ _id: id, user: req.user._id },
req.body,
{ new: true }
);
if (!updated) return res.status(404).json({ message: 'Task not found' });
return res.json(updated);
} catch (error) {
return res.status(500).json({ message: 'Server error' });
}
};


export const deleteTask = async (req, res) => {
try {
const { id } = req.params;
const deleted = await Task.findOneAndDelete({ _id: id, user: req.user._id });
if (!deleted) return res.status(404).json({ message: 'Task not found' });
return res.json({ message: 'Task deleted' });
} catch (error) {
return res.status(500).json({ message: 'Server error' });
}
};