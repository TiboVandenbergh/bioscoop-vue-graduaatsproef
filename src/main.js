import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css'; 
import { toastContainers } from 'vue3-toastify';
import store from './store';

//createApp(App).use(router).use(toastContainers).mount('#app')

const app = createApp(App);

app.use(store);

app.use(router).use(toastContainers);

store.dispatch('initializeState');

app.mount('#app');