import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLivreurDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
    type: String,
  })
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
}
