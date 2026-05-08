import type { App } from 'vue';
import Stepper from './index.vue';

Stepper.name = 'BwStepper';

Stepper.install = (app: App) => {
  app.component(Stepper.name!, Stepper);
};

export default Stepper;
