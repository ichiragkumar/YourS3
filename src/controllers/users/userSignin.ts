import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { userZODUserSigninSchema } from "../../zod/user";

export const userSignIn = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;
    const userSigninData = userZODUserSigninSchema.safeParse(body);

    if (!userSigninData.success) {
        return res.status(400).json({ message: userSigninData.error.message });
    }

    try {
        const user = await User.findOne({ email: userSigninData.data.email });
        if (!user || user.password !== userSigninData.data.password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );


        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_SECRET!,
            { expiresIn: "7d" }
        );


        user.refreshToken = refreshToken;
        await user.save();


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "User logged in successfully",
            token,
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error: userSignIn" });
    }
};
