import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'aos/dist/aos.css'

import './styles/main.css'


const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount('#app')
