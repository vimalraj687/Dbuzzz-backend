import User from '../models/usersModels.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

// ✅ Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, "hello");
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

     
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

     
    const user = await User.create({ name, email, password });

    
    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      message: 'Registered successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

 // login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

 
    generateTokenAndSetCookie(res, user._id);

    return res.json({
      message: 'Logged in',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// me
export const me = async (req, res) => {
  return res.json({ user: req.user });
};

 

// logout
export const logout = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  return res.json({ message: 'Logged out' });
};
