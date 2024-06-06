import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateClientDto, CreateLivreurDto, CreaterestaurateurDto } from '../dto';
import { Role } from '@gen/client/users';

@Controller('/auth')
@UseGuards()
@ApiTags('AuthGateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @ApiBody({ type: CreateClientDto })
  @Post('/signup/client')
  signUpClient(@Body() dto: CreateClientDto) {
    return this.authGatewayService.signUpUser(dto, Role.CLIENT);
  }

  @ApiBody({ type: CreateLivreurDto })
  @Post('/signup/livreur')
  signUpLivreur(@Body() dto: CreateLivreurDto) {
    return this.authGatewayService.signUpUser(dto, Role.LIVREUR);
  }

  @ApiBody({ type: CreaterestaurateurDto })
  @Post('/signup/restaurateur')
  signUpRestaurateur(@Body() dto: CreaterestaurateurDto) {
    return this.authGatewayService.signUpUser(dto, Role.RESTAURATEUR);
  }
}
