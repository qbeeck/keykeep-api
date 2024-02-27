import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
} from '@nestjs/common';

import { User } from '../../user/models/user.interface';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class IsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: User = request.user;

    const findedUser = await this.userService.findOne(user.id);

    return findedUser.id === Number(params.id);
  }
}
