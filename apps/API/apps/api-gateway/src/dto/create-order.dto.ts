import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Restaurant ID',
    example: 'Restaurant 1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  restaurant: string;

  @ApiProperty({
    description: 'Items ordered',
    example: '[Burger, Fries, Drink]',
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  items: string[];

  @ApiProperty({
    description: 'Menus ordered',
    example: '[Menu 1, Menu 2, Menu 3]',
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  menus: string[];

  @ApiProperty({
    description: 'Order price',
    example: 100,
    type: Number,
  })
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
