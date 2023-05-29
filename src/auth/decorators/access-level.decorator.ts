import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL } from 'src/constans';
import { ACCESS_LEVEL_KEY } from 'src/constans/key-decorators';

export const AccessLevel = (...level: Array<keyof typeof ACCESS_LEVEL>) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
