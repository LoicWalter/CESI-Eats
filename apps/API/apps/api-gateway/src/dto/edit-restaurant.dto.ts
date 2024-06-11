import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsNumberString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class EditRestaurantDto {
  @ApiProperty({
    description: 'Restaurant name',
    example: 'La bonne bouffe',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'ID of the restaurant owner',
    example: '1526845',
    type: String,
  })
  @IsOptional()
  @IsString()
  owner?: string;

  @ApiProperty({
    description: 'Restaurant price range',
    example: '20€-30€',
    type: String,
  })
  @IsOptional()
  @IsString()
  priceRange?: string;

  @ApiProperty({
    description: 'Phone number of the restaurant',
    example: '+33612345678',
    type: String,
  })
  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Address of the restaurant',
    example: '12 rue de la paix, 75000 Paris',
    type: String,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'SIRET number of the restaurant',
    example: '12345678912345',
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  @Length(14)
  siret?: string;

  @ApiProperty({
    description: 'Category of the restaurant',
    example: 'Fast-food',
    type: String,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
