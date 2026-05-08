import type { App } from 'vue';
import Textarea from './index.vue';

Textarea.name = 'BwTextarea';

Textarea.install = (app: App) => {
  app.component(Textarea.name!, Textarea);
};

export default Textarea;
