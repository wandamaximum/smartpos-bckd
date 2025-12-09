import { Router } from "express";
import * as controller from "../controllers/purchase-order.controller";

const poRouter = Router();

poRouter.get("/", controller.getAllPO);
poRouter.post("/", controller.createPO);


export default poRouter;
