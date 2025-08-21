import { Response } from 'express';

export const throwServerError = (res: Response, e: Error) => {
  console.debug(e.message);
  res.status(500);
  res.send('Something went wrong');
};
