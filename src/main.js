import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Game from './Game.vue'

import './assets/main.css'

const app = createApp(Game)
const pinia = createPinia()

app.use(pinia)
// app.use(router)

app.mount('#app')
