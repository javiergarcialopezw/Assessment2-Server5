import { NextFunction, Request, Response } from "express";
import { ReturnHelper } from "@Helper/return.helper";
import { HttpStatusCode } from "axios";

class HomeController {
  public static async main(_req: Request, res: Response, next: NextFunction) {
    const message = "Welcome to My Git Repositories";
    const toReturn = new ReturnHelper<Object>(HttpStatusCode.Ok, [{ message }]);

    res.status(200).send(toReturn);
    next();
  }
}

export default HomeController;
