import { theatre } from '@prisma/client';

export default class TheatreModel {
  theatres: theatre[];

  constructor(theatres: theatre[]) {
    this.theatres = theatres;
  }
}
