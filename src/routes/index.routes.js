import { Router } from "express";
import {getInicio} from '../controllers/index.controller.js'

const router = Router();

router.get('/', getInicio);

export default router;