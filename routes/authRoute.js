import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
}
    from "../controller/authController.js"
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";



//router object
const router = express.Router();

//routing
//register || method post
router.post('/register', registerController)


//login || post
router.post('/login', loginController)

//forgot password || post
router.post('/forgot-password', forgotPasswordController)

//test route
router.get('/test', requireSignIn, isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//admin auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);


//orders
router.get('/orders', requireSignIn, getOrdersController)

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router
