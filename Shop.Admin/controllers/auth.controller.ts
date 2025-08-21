import { NextFunction, Router, Request, Response } from 'express';
import { throwServerError } from './helper';
import { IAuthRequisites } from '@Shared/types';
import { verifyRequisites } from '../models/auth.model';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/login') || req.path.includes('/authenticate')) {
    next();
    return;
  }

  if (req.session?.username) {
    next();
  } else {
    res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
  }
};

export const authRouter = Router();

authRouter.get('/login', async (req: Request, res: Response) => {
  try {
    res.render('login');
  } catch (e) {
    throwServerError(res, e);
  }
});

authRouter.post('/authenticate', async (req: Request<{}, {}, IAuthRequisites>, res: Response) => {
  try {
    const verified = await verifyRequisites(req.body);

    if (verified) {
      req.session.username = req.body.username;
      res.redirect(`/${process.env.ADMIN_PATH}`);
    } else {
      res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
    }
  } catch (e) {
    throwServerError(res, e);
  }
});

authRouter.get('/logout', async (req: Request, res: Response) => {
  try {
    req.session.destroy((e) => {
      if (e) {
        console.log('Something wen wrong with session destroying', e);
      }

      res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
    });
  } catch (e) {
    throwServerError(res, e);
  }
});
