import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class EditItemDto {
  @ApiProperty({
    description: 'Item name',
    example: 'Cheeseburger',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'description of the item',
    example: 'Burger with cheese and beef',
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Item price',
    example: '10€',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Régime',
    example: 'Vegan',
    type: String,
  })
  @IsString()
  @IsOptional()
  regime: string;

  @ApiProperty({
    description: 'Category',
    example: 'Desserts',
    type: String,
  })
  @IsString()
  @IsOptional()
  category: string;
}
