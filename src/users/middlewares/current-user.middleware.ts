import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { UUID } from 'crypto';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUserId?: UUID;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // const currentUser: User = {
    //   id: 'a9535614-0bc2-4adc-955a-0534b76d2ef3',
    //   email: 'example@email.com',
    //   nickname: 'anonymous',
    //   lp: 0,
    //   bio: 'nothing',
    //   own_channels: [],
    //   channel_relations: [],
    //   userRelations: [],
    // };
    req.currentUserId = '99665c6a-2196-46ac-b51a-2df1fbca7875';

    next();
  }
}
