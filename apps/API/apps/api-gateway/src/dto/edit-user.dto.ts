import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    type: String,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
