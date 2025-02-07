import express from "express";
import { getAllUsers, getUserById, login, profile, reg, UpdateUser,deleteuser, exportUsers, uploadUser } from "../controller/usercontrol.js";
import { protect } from "../auth/index.js";
import multer from "multer";
import path from "path"

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });

router.post("/create",reg)
// router.post("/ownercreate",ownerreg)
router.post("/login",login)
router.get("/profile",protect,profile)
router.get("/getalluser",getAllUsers)
router.get("/getuser/:id",getUserById)
router.put("/update/:id",UpdateUser)
router.delete("/delete/:id",deleteuser)
router.post('/uploadusers', protect, upload.single('file'), uploadUser);
router.get('/export-users', protect, exportUsers);
export default router;