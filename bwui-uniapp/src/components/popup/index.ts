import type { App } from 'vue';
import Popup from './index.vue';

Popup.name = 'BwPopup';

Popup.install = (app: App) => {
  app.component(Popup.name!, Popup);
};

export default Popup;
