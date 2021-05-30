import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //get user from request and return
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
