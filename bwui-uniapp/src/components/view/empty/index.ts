import type { App } from 'vue';
import Empty from './index.vue';

Empty.name = 'BwEmpty';

Empty.install = (app: App) => {
  app.component(Empty.name!, Empty);
};

export default Empty;
