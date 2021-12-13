import {Request, Response} from "express";

export default async function (err: any, req: Request, res: Response, next: any) {
  console.error(err);
  return res.sendStatus(500);
}
