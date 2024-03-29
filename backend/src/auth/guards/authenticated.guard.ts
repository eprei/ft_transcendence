import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (isPublic) {
            return true
        }
        const request = context.switchToHttp().getRequest()

        return request.isAuthenticated() && request.session.needTFA === false
    }
}

/*

This guard checks if a user is authenticated before allowing access to
a path or endpoint. It relies on the isAuthenticated() method provided by
Passport and Express sessions to perform the verification.

In the canActivate method, the execution context is obtained by
context.switchToHttp().getRequest(). This provides access to the current HTTP
request.

It then checks if the request has an isAuthenticated() method. This method is
provided by the Passport integration and Express sessions, and returns true if
the user is authenticated or false if not.

The result of the check is returned as the result of the canActivate method. If
the user is authenticated, access to the protected path is allowed. If the user is
not authenticated, access is blocked and the request is denied.

*/
