import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor() {}

  getNotifications() {
    return 'Hello World!';
  }
}
