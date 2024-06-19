import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Item name',
    example: 'Cheeseburger',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'description of the item',
    example: 'Burger with cheese and beef',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Item price',
    example: '10€',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Régime',
    example: 'Vegan',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  regime: string;

  @ApiProperty({
    description: 'Category',
    example: 'Desserts',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
