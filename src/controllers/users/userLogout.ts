import { Request, Response } from "express";
import User from "../../models/user.model";


export const userLogout = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found" });
        }


        await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });


        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: userLogout" });
    }
};
