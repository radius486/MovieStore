import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import store from './store';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(store)
  .use(router)
  .mount('#app');
