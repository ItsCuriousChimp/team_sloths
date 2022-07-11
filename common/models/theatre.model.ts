import { theatre } from '@prisma/client';

export default class TheatreModel {
  theatre: theatre;

  constructor(theatreResponse: theatre) {
    this.theatre = theatreResponse;
  }
}
