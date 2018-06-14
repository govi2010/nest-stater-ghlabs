import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Hello World! I am Govinda, Nodemose detects this.';
  }
}
