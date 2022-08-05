import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

// Create and export the mapper
const mapper = createMapper({ strategyInitializer: classes() });

export = mapper;
