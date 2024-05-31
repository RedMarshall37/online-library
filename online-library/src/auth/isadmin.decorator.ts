import { SetMetadata } from '@nestjs/common';

export const ISADMIN_KEY = 'AdminGuard';
export const Admin = () => SetMetadata(ISADMIN_KEY, true);