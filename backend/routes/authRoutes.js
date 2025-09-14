import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";

export default function authRoutes(supabase) {
  const router = express.Router();

  router.post("/signup", (req, res) => signup(req, res, supabase));
  router.post("/login", (req, res) => login(req, res, supabase));
  router.get("/profile", (req, res) => getProfile(req, res, supabase));

  return router;
}
