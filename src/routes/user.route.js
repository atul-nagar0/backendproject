import {Router} from 'express';
import { asyncHandler } from '../utils/asynchandler.js';
import {upload} from '../middleware/multer.middleware.js'
import { RegisterUser, LoginUser, logOut } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const userinforouter = Router()


userinforouter.route('/register').post( 
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]), 
    RegisterUser
)


userinforouter.route('/login').post(LoginUser)

userinforouter.route('/logout').post(verifyJWT, logOut)



export {userinforouter,}