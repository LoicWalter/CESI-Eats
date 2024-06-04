import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateClientDto } from '../dto/create-client.dto';
@Controller('/auth')
@UseGuards()
@ApiTags('AuthGateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('/signup/client')
  signUpClient(@Body() dto: CreateClientDto) {
    return this.authGatewayService.signUpClient(dto);
  }
}
