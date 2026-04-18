import { createApp } from 'vue';
import { createMemoryHistory, createWebHashHistory, createWebHistory, createRouter } from 'vue-router';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';

const routes = [
  { path: '/', component: ToDo },
  { path: '/modals', component: Modals },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



// import the root component App from a single-file component.
import App from './App.vue';

const app = createApp(App).use(router).mount("#app");