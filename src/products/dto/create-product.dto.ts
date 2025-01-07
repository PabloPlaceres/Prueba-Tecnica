import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  Min
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
      description: 'Name of the product',
      example: 'Laptop',
      type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      description: 'Description of the product',
      example: 'High-performance laptop for gaming and work',
      type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
      description: 'Price of the product',
      example: 999.99,
      type: 'number',
      format: 'decimal'
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
      description: 'Current stock quantity',
      example: 5,
      type: 'integer'
    })
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
      description: 'Category of the product',
      example: 'Electronics',
      type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    category: string;
}

