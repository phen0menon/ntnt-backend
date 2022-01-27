import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  public getRandomElement<T>(container: T[]) {
    return container[Math.floor(Math.random() * container.length)];
  }
}
