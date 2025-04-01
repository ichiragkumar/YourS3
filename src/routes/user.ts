import express, { Router} from 'express';
import { userSignup } from '../controllers/users/userSignup';
import { userSignIn } from '../controllers/users/userSignin';
import { userLogout } from '../controllers/users/userLogout';



const userRouter : Router = express.Router();

userRouter.post("/signup",userSignup);

userRouter.post("/signin",userSignIn);

userRouter.post("/logout",userLogout);

userRouter.patch("/update",userUpdate);

userRouter.delete("/delete",userDelete);
export default userRouter;