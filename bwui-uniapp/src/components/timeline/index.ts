import type { App } from 'vue';
import Timeline from './index.vue';

Timeline.name = 'BwTimeline';

Timeline.install = (app: App) => {
  app.component(Timeline.name!, Timeline);
};

export default Timeline;
