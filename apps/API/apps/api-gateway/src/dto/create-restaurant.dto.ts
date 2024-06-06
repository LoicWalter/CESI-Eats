import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsNumberString,
  IsMimeType,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Restaurant name',
    example: 'La bonne bouffe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the restaurant owner',
    example: '1526845',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({
    description: 'Restaurant price range',
    example: '20€-30€',
    type: String,
  })
  @IsString()
  priceRange: string;

  @ApiProperty({
    description: 'Current offer provided by the restaurant',
    example: '-15% on all the menu',
    type: Number,
  })
  @IsNumber()
  currentOffer: number;

  @ApiProperty({
    description: 'Profil image of the restaurant',
    example: 'https://www.google.com/image.png',
    type: String,
  })
  @IsMimeType()
  image: string;

  @ApiProperty({
    description: 'Phone number of the restaurant',
    example: '+33612345678',
    type: String,
  })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Address of the restaurant',
    example: '12 rue de la paix, 75000 Paris',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'SIRET number of the restaurant',
    example: '12345678912345',
    type: String,
  })
  @IsNumberString()
  @Length(14)
  @IsNotEmpty()
  siret: string;

  @ApiProperty({
    description: 'Category of the restaurant',
    example: 'Fast-food',
    type: String,
  })
  @IsString()
  category: string;
}
