import type { App } from 'vue';
import Countdown from './index.vue';

Countdown.name = 'BwCountdown';

Countdown.install = (app: App) => {
  app.component(Countdown.name!, Countdown);
};

export default Countdown;
