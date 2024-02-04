import express from "express";

import { login, accessToken } from "../controllers/auth";

const auth = express.Router();

auth.post("/login", login);
auth.get("/accessToken", accessToken);

export default auth;
