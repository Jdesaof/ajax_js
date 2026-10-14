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
import ChuckNorris from './pages/ChuckNorris.vue';
import CatFacts from './pages/CatFacts.vue'
import RickAndMorty from './pages/RickAndMorty.vue';
import CanvasExample from './pages/CanvasExample.vue';
import WebApis from './pages/WebApis.vue';
import WebAudioDemo from './pages/WebAudioDemo.vue';

const routes = [
  { path: '/', component: ToDo, name: 'ToDo' },
  { path: '/modals', component: Modals, name: 'Modals' },
  { path: '/messages', component: Messages, name: 'Messages' },
  { path: '/buttons', component: Buttons, name: 'Buttons' },
  { path: '/chuck', component: ChuckNorris, name: 'Chuck Norris' },
  { path: '/catfacts', component: CatFacts, name: 'Cat Facts' },
  { path: '/rickandmorty', component: RickAndMorty, name: 'Rick And Morty' },
  { path: '/canvas', component: CanvasExample, name: 'Canvas' },
  { path: '/webapis', component: WebApis, name: 'WebApis' },
  { path: '/webaudio', component: WebAudioDemo, name: 'Web Audio Demo' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import App from './App.vue';

createApp(App)
  .use(router)
  .mount('#app');