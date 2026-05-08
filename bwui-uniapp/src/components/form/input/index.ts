import type { App } from 'vue';
import Input from './index.vue';

Input.name = 'BwInput';

Input.install = (app: App) => {
  app.component(Input.name!, Input);
};

export default Input;
