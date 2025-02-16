import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia(); // Créez l'instance de Pinia

app.use(pinia); // Utilisez Pinia *avant* d'utiliser le routeur
app.use(router); // Utilisez le routeur

app.mount('#app')
