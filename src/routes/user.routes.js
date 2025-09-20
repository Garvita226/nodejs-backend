import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);


router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/get-user").post(getCurrentUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-account-details").post(verifyJWT, updateAccountDetails);
router.route("/update-avatar").post(verifyJWT, updateUserAvatar);
router.route("/update-coverImage").post(verifyJWT, updateUserCoverImage);


export default router;