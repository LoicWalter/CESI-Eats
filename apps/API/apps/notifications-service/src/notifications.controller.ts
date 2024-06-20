import { Controller, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Sse('notifications')
  sse() {
    return this.notificationsService.getNotifications();
  }
}
