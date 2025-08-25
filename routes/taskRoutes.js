import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddlewares.js';

const router = Router();

// sab routes ke liye protect middleware
router.use(protect);

// GET all tasks
router.get('/', getTasks);

// CREATE new task
router.post('/', createTask);

// UPDATE task by id
router.put('/:id', updateTask);

// DELETE task by id
router.delete('/:id', deleteTask);

export default router;
