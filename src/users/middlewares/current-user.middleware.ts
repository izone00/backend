import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const currentUser: User = {
      id: 0,
      email: 'example@email.com',
      nickname: 'anonymous',
      lp: 0,
      bio: 'nothing',
      own_channels: [],
    };
    req.currentUser = currentUser;

    next();
  }
}
