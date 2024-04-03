import { Router } from "express";
import { getAutoComplete } from "../controllers/getFiles.js";

const router = Router();

router.get("/get-auto-complete", getAutoComplete);


export default router;