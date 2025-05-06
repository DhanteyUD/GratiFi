import { Router } from "express";
import { createCreator } from "@/controllers/creatorsController";
import { listCreators } from "@/controllers/creatorsController";
import { recordTip } from "@/controllers/tipsController";

const router = Router();

router.post("/creator", createCreator);
router.get("/creators", listCreators);
router.post("/tips", recordTip);

export default router;
