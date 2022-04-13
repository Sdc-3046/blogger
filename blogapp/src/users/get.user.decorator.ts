/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, obj) => {
  if (obj.args.length > 0) {
    const request = obj.args[2].req;
    return request.user;
  }
  return null;
});
  