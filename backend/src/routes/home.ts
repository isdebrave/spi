import express from "express";

import { content } from "../controllers/home";

const home = express.Router();

home.get("/", content);

export default home;
