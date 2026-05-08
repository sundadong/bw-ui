import type { App } from 'vue';
import Badge from './index.vue';

Badge.name = 'BwBadge';

Badge.install = (app: App) => {
  app.component(Badge.name!, Badge);
};

export default Badge;
