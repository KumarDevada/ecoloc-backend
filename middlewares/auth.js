import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (user) => {
    const token = jwt.sign({ userInfo: user }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '2d'});
    return token
}

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ success: false, message: "User is not authenticated" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, deocde) => {
        if(err) {
            console.log(err);
            return res.status(403).json({ success: false, message: "Not a valid user"});
        }

        req.user = deocde;
        next();
    });
} 

export const generateRefreshToken = (user) => {
    const token = jwt.sign({ userInfo: user }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '2d' });
    return token;
}

export const verifyRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken) {
        return res.status(403).json({ success: false, message: "user is not authenticated" });
    }
    
    const refreshToken = cookies?.refreshToken;
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
        if(err) {
            return res.status(403).json({ success: false, message: "not a valid user" });
        }
        
        const accessToken = generateAccessToken(decode.userInfo);
        res.status(200).json({ success: true, accessToken: accessToken, data: decode.userInfo });
    });
}