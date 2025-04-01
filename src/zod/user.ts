


import { z } from "zod";

export const userZODSchema = z.object({
    username: z.string().min(3).max(20).optional(),
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().min(3).max(20),
    password: z.string().min(3).max(20),
});

export const userZODUserSigninSchema = z.object({
    email: z.string().email().min(3).max(20),
    password: z.string().min(3).max(20)
});