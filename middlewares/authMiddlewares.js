import jwt from 'jsonwebtoken';
import User from '../models/usersModels.js';


export const protect = async (req, res, next) => {
try {
const token = req.cookies?.[process.env.COOKIE_NAME];
if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });


const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
if (!req.user) return res.status(401).json({ message: 'User not found' });


next();
} catch (error) {
return res.status(401).json({ message: 'Not authorized' });
}
};