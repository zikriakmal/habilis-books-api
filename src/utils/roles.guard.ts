import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        let result = -1;
        const roles = this.reflector.get(Roles, context.getHandler()) ?? [];

        const request = context.switchToHttp().getRequest();
        result = roles.findIndex((dt) => dt === request?.user?.role);

        return result !== -1;
    }
}
