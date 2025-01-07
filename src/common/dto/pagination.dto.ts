import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class PaginationDto {
    @ApiProperty({
        description: 'Maximum number of results to return',
        example: 10,
        type: 'integer',
        minimum: 1
      })
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        description: 'Offset for pagination',
        example: 0,
        type: 'integer',
        minimum: 0
      })
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    offset?: number;

    @ApiProperty({
        description: 'Parámetros adicionales de consulta',
        type: 'object',
        additionalProperties: true,
        examples: {
          "category": "electronics",
          "min_price": 100,
          "max_price": 500,
          "brand": "Apple"
        }
      })
    @IsOptional()
    ter: any;
}
