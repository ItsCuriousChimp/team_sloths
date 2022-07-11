import { screen } from '@prisma/client';

export default class ScreenModel {
  screen : screen;

  constructor(Screen : screen) {
    this.screen = Screen;
  }
}
