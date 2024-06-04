import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order name',
    example: 'Order 1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Order price',
    example: 100,
    type: Number,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
    type: String,
  })
  @IsEmail()
  email: string;
}
