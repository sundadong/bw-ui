import type { App } from 'vue';
import Avatar from './index.vue';

Avatar.name = 'BwAvatar';

Avatar.install = (app: App) => {
  app.component(Avatar.name!, Avatar);
};

export default Avatar;
