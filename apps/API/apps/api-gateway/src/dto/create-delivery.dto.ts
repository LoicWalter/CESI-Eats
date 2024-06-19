import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'Order ID',
    example: 'Order 1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  order: string;

  @ApiProperty({
    description: 'Delivery address',
    example: '1 rue de la Paix, Paris',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;
}
