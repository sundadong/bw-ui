import type { App } from 'vue';
import Notify from './index.vue';

Notify.name = 'BwNotify';

Notify.install = (app: App) => {
  app.component(Notify.name!, Notify);
};

export default Notify;
