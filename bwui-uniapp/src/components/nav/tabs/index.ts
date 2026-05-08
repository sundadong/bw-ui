import type { App } from 'vue';
import Tabs from './index.vue';

Tabs.name = 'BwTabs';

Tabs.install = (app: App) => {
  app.component(Tabs.name!, Tabs);
};

export default Tabs;
