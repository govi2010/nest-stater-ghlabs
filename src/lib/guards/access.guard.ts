import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';

import { GroupsService } from '../services/groups.service';
import { TokenService } from '../services/token.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly groupsService: GroupsService,
  ) {
    // workaround
    this.groupsService.fullLoadAll();
  }

  public canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers.authorization
      ? String(req.headers.authorization)
      : null;
    const roles = this.reflector.get<string[]>('roles', handler);
    const permissions = this.reflector.get<string[]>('permissions', handler);

    if (
      roles &&
      roles.length > 0 &&
      permissions &&
      permissions.length > 0 &&
      authorizationHeader &&
      authorizationHeader.indexOf('JWT') === 0
    ) {
      let token = 'JWT'
        ? authorizationHeader.split('JWT')[1]
        : authorizationHeader;
      token = token.trim();
      if (token && this.tokenService.verify(token)) {
        const data: any = this.tokenService.decode(token);
        req.user = plainToClass(User, data);
        req.user.groups = data.groups.map(group =>
          this.groupsService.getGroupByName(group.name),
        );
      }
    }

    // const hasRole = roles ? roles.filter(roleName =>
    //   req['user'] &&
    //   req['user'][roleName],
    // ).length > 0 : null;

    const hasPermission = permissions
      ? req.user &&
        req.user instanceof User &&
        req.user.checkPermissions(permissions)
      : null;
    // return hasRole === true || hasPermission === true || (hasRole === null && hasPermission === null);
    return hasPermission === true || hasPermission === null;
  }
}
