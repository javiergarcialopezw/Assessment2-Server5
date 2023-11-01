import GitController from "@Controller/git.controller";
import HomeController from "@Controller/home.controller";
import { Router } from "express";

const router = Router();

router.get("/", HomeController.main);
router.get("/github/repos", GitController.getRepositories);
router.post("/github/clone-repo", GitController.cloneRepo);

export default router;
