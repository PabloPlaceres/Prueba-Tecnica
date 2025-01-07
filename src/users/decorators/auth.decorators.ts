import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolProtected } from "src/users/decorators/roles-protected.decoratos"; 
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guards"; 

export function Auth(... roles){

    return applyDecorators(
        RolProtected(...roles), 
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}

