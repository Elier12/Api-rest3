import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../milddewares/requireAuth.js";
import { bodyLinkValidator, paramsValidator } from "../milddewares/validatorManager.js";
const router = Router();

//GET

router.get('/',requireToken,getLinks)
router.get('/:id',requireToken,paramsValidator,getLink)
router.post('/',requireToken,bodyLinkValidator,createLink)
router.delete('/:id',requireToken,paramsValidator,removeLink)

export default router