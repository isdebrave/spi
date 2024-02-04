import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import home from "./routes/home";
import auth from "./routes/auth";

const app = express();
dotenv.config();

app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/", home);
app.use("/auth", auth);

app.listen(8080, () => console.log("✅ Listening on port 8080"));
