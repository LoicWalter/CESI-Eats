import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class EditMenuDto {
  @ApiProperty({
    description: 'Menu name',
    example: 'Starter, main course, dessert',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'description of the menu',
    example: 'A starter, a main course and a dessert for 20€',
    type: String,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Items in the menu',
    example: '["1562884", "1562885"]',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  itemIDs: string[];

  @ApiProperty({
    description: 'Menu price',
    example: '25€',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: number;
}
