import { Router } from "express";
import { listCreators } from "@/controllers/creatorsController";
import { recordTip } from "@/controllers/tipsController";

const router = Router();

router.get("/creators", listCreators);
router.post("/tips", recordTip);

export default router;
