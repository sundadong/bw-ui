import type { App } from 'vue';
import Button from './index.vue';

Button.install = (app: App) => {
  app.component(Button.name!, Button);
};

export default Button;
