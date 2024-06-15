import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGatewayService } from './auth-gateway.service';
import { CreateClientDto, CreateLivreurDto, CreateRestaurateurDto, EditUserDto } from '../dto';
import { Role } from '@gen/client/users';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CurrentUser,
  JwtAuthGuard,
  ProfileFileValidationPipe,
  Roles,
  RolesGuard,
} from 'libs/common';
import { User } from '@gen/client/users';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const profileStorage = {
  storage: diskStorage({
    destination: 'uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('/auth')
@ApiTags('AuthGateway')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @ApiBody({ type: CreateClientDto })
  @UseInterceptors(FileInterceptor('profilePicture', profileStorage))
  @Post('/signup/client')
  signUpClient(
    @Body() dto: CreateClientDto,
    @UploadedFile(new ProfileFileValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.authGatewayService.signUpUser(dto, Role.CLIENT, file);
  }

  @ApiBody({ type: CreateLivreurDto })
  @UseInterceptors(FileInterceptor('profilePicture', profileStorage))
  @Post('/signup/livreur')
  signUpLivreur(
    @Body() dto: CreateLivreurDto,
    @UploadedFile(new ProfileFileValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.authGatewayService.signUpUser(dto, Role.LIVREUR, file);
  }

  @ApiBody({ type: CreateRestaurateurDto })
  @UseInterceptors(FileInterceptor('profilePicture', profileStorage))
  @Post('/signup/restaurateur')
  signUpRestaurateur(
    @Body() dto: CreateRestaurateurDto,
    @UploadedFile(new ProfileFileValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.authGatewayService.signUpUser(dto, Role.RESTAURATEUR, file);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profilePicture', profileStorage))
  @Patch('/users')
  updateUser(
    @CurrentUser() user: User,
    @Body() dto: EditUserDto,
    @UploadedFile(new ProfileFileValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.authGatewayService.updateUser(user.id, dto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('profilePicture', profileStorage))
  @Patch('/users/:id')
  @Roles(Role.ADMIN)
  updateUserByAdmin(
    @Param('id') id: string,
    @Body() dto: EditUserDto,
    @UploadedFile(new ProfileFileValidationPipe())
    file: Express.Multer.File,
  ) {
    console.log('updateUserByAdmin', id, dto, file);
    return this.authGatewayService.updateUser(id, dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  getUser(@Param('id') id: string) {
    return this.authGatewayService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  getUsers() {
    return this.authGatewayService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profilePicture/:id')
  getProfilePicture(@Res() res, @Param('id') id: string) {
    return this.authGatewayService.getProfilePicture(id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users')
  deleteUser(@CurrentUser() user: User) {
    return this.authGatewayService.deleteUser(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/users/:id')
  deleteUserByAdmin(@Param('id') id: string) {
    return this.authGatewayService.deleteUser(id);
  }
}
