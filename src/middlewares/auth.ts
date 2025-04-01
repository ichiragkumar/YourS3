
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";


export const isUserAuthenticated = async (req: Request, res: Response): Promise<any> => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token found" });
        }


        jwt.verify(refreshToken, process.env.JWT_SECRET!,async (err:any, decoded:any) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const user = await User.findById(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: "Refresh token does not match" });
            }

            // Issue new access token
            const newAccessToken = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: "15m" }
            );

            return res.status(200).json({ accessToken: newAccessToken });
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error: refreshAccessToken" });
    }
};
