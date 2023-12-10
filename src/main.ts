import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import outsideClick from '@/directives/VOutsideClick';

const app = createApp(App);

app.directive('clickOutside', outsideClick);

app
    .use(createPinia())
    .use(autoAnimatePlugin)
    .mount('#app');
