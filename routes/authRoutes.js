import express from "express"
import AuthController from "../controllers/authControllers.js"

const router = express.Router({
    mergeParams: true
  })

router.post("/login",AuthController.login)
router.post("/signup",AuthController.register)


export default router;
