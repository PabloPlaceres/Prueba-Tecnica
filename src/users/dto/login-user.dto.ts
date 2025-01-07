import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    type: 'string',
    format: 'email'
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'hashed_password',
    type: 'string',
    format: 'password'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
