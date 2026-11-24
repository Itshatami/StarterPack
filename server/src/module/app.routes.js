import { Router } from "express";
import AuthRouter from "./auth/auth.routes.js";
import CategoryRouter from "./category/category.routes.js";

const router = Router();

router.use("/api/auth", AuthRouter);
router.use("/api/category", CategoryRouter);

const AppRouter = router;

export default AppRouter;