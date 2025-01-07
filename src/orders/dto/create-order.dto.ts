import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';


export class CreateOrderDto {
  @ApiProperty({
    description: 'List of product IDs',
    type: 'array',
    items: { type: 'string' },
    isArray: true,
    example: ['product1-id', 'product2-id']
  })
  @IsArray()
  @IsNotEmpty()
  products: string[];
}

