import { CreateClientDto, CreateLivreurDto, CreateRestaurateurDto } from '../dto';

export type CreateUserDto = CreateClientDto | CreateLivreurDto | CreateRestaurateurDto;
