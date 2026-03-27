import { Router } from "express";
import { SaveDraft, LoadDraft, DeleteDraft } from "./draft.controller";

const router = Router();

router.post("/drafts/save", SaveDraft);
router.get("/drafts/load", LoadDraft); 
router.delete("/drafts/delete", DeleteDraft); 

export default router;
