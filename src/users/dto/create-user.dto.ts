import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsIn,
  IsOptional
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
      description: 'The name of the user',
      example: 'John Doe',
      type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      description: 'The email address of the user',
      example: 'john.doe@example.com',
      format: 'email'
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
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

    @ApiProperty({
      description: 'The role of the user (optional)',
      example: 'admin',
      type: 'string',
      default: 'usuario'
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['admin', 'usuario'])
    @IsOptional()
    role?: string = 'usuario';
}

