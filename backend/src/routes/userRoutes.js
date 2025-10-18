const express=require("express");
const { verifyToken} = require("../middlewares/authMiddleware");
const authorizeRoles= require("../middlewares/roleMiddleware");
const router=express.Router();

// Protected route: only admin can access
router.get("/admin", verifyToken,authorizeRoles("admin"), (req, res) => {
    res.json({ message: `Welcome admin ${req.user.id}` });
});

// Protected route: both admin and driver can access
router.get("/driver", verifyToken,authorizeRoles("admin","driver"), (req, res) => {
    res.json({ message: `Welcome driver/admin ${req.user.id}` });
});

// Protected route: everyone (admin, driver, user) can access
router.get("/user", verifyToken,authorizeRoles("admin","driver","user"), (req, res) => {
    res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports=router;