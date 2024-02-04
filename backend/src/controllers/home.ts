import { Request, Response } from "express";

import contentDatabase from "../database/content";

export const content = (req: Request, res: Response) => {
  const lastId = +req.query.lastId!;
  const limit = 5;

  const content = [];
  const startIdx = lastId === -1 ? 0 : +lastId;
  const endIdx = Math.min(startIdx + limit, contentDatabase.length);

  for (let i = startIdx; i < endIdx; i++) {
    content.push(contentDatabase[i]);
  }

  return res.status(200).json(content);
};
