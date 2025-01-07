import { SetMetadata } from "@nestjs/common";

export const RolProtected = (...args: string[])=>{
    return SetMetadata('roles', args)
}