import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsPositive, IsString } from 'class-validator';

export class EditOrderDto {
  @ApiProperty({
    description: 'Items ordered',
    example: '[Burger, Fries, Drink]',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  items: string[];

  @ApiProperty({
    description: 'Order price',
    example: 100,
    type: Number,
  })
  @IsPositive()
  @IsOptional()
  price: number;
}
