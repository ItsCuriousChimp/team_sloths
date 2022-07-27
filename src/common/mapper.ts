import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export default createMapper({
  strategyInitializer: classes(),
});
