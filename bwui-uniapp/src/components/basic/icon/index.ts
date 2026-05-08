import type { App } from 'vue';
import Icon from './index.vue';

Icon.name = 'BwIcon';

Icon.install = (app: App) => {
  app.component(Icon.name!, Icon);
};

export default Icon;
