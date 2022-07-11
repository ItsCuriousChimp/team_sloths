import { show } from '@prisma/client';

export default class ShowModel {
  show : show;

  constructor(Show : show) {
    this.show = Show;
  }
}
