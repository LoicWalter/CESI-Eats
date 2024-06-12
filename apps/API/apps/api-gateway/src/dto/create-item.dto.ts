import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

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
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Item price',
    example: '10€',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'ID of the restaurant where the item is sold',
    example: '1526845',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  restaurantID: string;
}
