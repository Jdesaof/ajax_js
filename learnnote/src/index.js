import { createApp } from 'vue';
import {
  createWebHashHistory,
  createRouter
} from 'vue-router';

import 'bulma/css/bulma.min.css';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';
import Messages from './pages/Messages.vue';
import Buttons from './pages/Buttons.vue';

const routes = [
  { path: '/', component: ToDo, name: 'ToDo' },
  { path: '/modals', component: Modals, name: 'Modals' },
  { path: '/messages', component: Messages, name: 'Messages' },
  { path: '/buttons', component: Buttons, name: 'Buttons' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import App from './App.vue';

createApp(App)
  .use(router)
  .mount('#app');