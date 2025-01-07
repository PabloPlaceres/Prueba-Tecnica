import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log(roles)
      if (!roles || roles.length <1 ) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log(user)
      if (!user || !user.role) {
        throw new UnauthorizedException('User does not have defined roles');
      }
      const hasRole = () => roles.includes(user.role);
      if (!hasRole()) {
        throw new ForbiddenException('User does not have the necessary role');
      }
      return true;
    } catch (error) {
      console.error('Error in role guard:', error);
      return false;
    }
  }
}

