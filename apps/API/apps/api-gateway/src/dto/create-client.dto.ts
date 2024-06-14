import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+33123456789',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'User address',
    example: '1 rue de Paris, 75000 Paris',
    type: String,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'User card name',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsOptional()
  cardOwner?: string;

  @ApiProperty({
    description: 'User card number',
    example: '1234567890123456',
    type: String,
  })
  @IsString()
  @IsOptional()
  cardNumber?: string;

  @ApiProperty({
    description: 'User card expiry date',
    example: '12/24',
    type: String,
  })
  @IsString()
  @IsOptional()
  cardExpiration?: string;

  @ApiProperty({
    description: 'User card cvv',
    example: '123',
    type: String,
  })
  @IsString()
  @IsOptional()
  cardCvc?: string;

  @ApiProperty({
    description: 'User parrain id',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  parrainId?: string;
}
