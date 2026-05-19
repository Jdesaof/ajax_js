import { createApp } from 'vue';
import { createMemoryHistory, createWebHashHistory, createWebHistory, createRouter } from 'vue-router';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';
import Messages from './pages/Messages.vue';

const routes = [
  { path: '/', component: ToDo, name: "ToDo" },
  { path: '/modals', component: Modals, name: "Modals" },
  { path: '/messages', component: Messages, name: "Messages" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



// import the root component App from a single-file component.
import App from './App.vue';

const app = createApp(App).use(router).mount("#app");