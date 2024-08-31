import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// use to provide current user data
// use by using @CurrentUser
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
