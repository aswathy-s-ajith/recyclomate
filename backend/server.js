import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());


const supabase=createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

import authRoutes from "./routes/authRoutes.js";
app.use("/auth",authRoutes(supabase));

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));