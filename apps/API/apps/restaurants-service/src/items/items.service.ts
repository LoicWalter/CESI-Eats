import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { CreateItemMessage, EditItemMessage } from 'libs/common';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  createItem(data: CreateItemMessage) {
    console.log('Creating item :', data);
    const { restaurantID, ...rest } = data.dto;
    return this.prisma.item.create({
      data: {
        ...rest,
        itemPicture: data.itemPicture,
        restaurant: { connect: { id: restaurantID } },
      },
    });
  }

  editItem(data: EditItemMessage) {
    console.log('Updating item :', data);
    return this.prisma.item.update({
      where: { id: data.id },
      data: {
        ...data.dto,
        itemPicture: data.itemPicture,
      },
    });
  }

  deleteItem(id: string) {
    console.log('Deleting item :', id);
    return this.prisma.item.delete({ where: { id } });
  }

  getItem(id: string) {
    console.log('Getting item :', id);
    return this.prisma.item.findUnique({ where: { id } });
  }

  getAllItems() {
    console.log('Getting all items');
    return this.prisma.item.findMany();
  }
}
