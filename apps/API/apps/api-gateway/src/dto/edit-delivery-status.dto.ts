import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditDeliveryStatusDto {
  @ApiProperty({
    description: 'Status of the delivery order',
    example: 'LIVRAISON_ACCEPTEE',
    type: String,
  })
  @IsString()
  @IsOptional()
  status?: string;
}
