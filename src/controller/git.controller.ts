import { Request, Response } from "express";
import GitHandler from "@Handler/git.handler";

class GitController {
  public static async getRepositories(req: Request, res: Response) {
    const inputs: any = req.query;
    const result = await GitHandler.getRepositories(inputs);
    res.status(200).send(result);
  }

  public static async cloneRepo(req: Request, res: Response) {
    const inputs: any = req.body;
    const result = await GitHandler.cloneRepository(inputs);
    res.status(200).send(result);
  }
}

export default GitController;
