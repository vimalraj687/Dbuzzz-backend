import jwt from 'jsonwebtoken';


export const generateTokenAndSetCookie = (res, userId) => {
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
expiresIn: '7d'
});


res.cookie(process.env.COOKIE_NAME, token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
maxAge: 7 * 24 * 60 * 60 * 1000
});


return token;
};