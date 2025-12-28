import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import dayjsPlugin from '@/plugins/dayjs'

import { run } from '@/plugins/sqlocal/migration'

run().then(() => console.log('success run migration'))

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.use(dayjsPlugin)

app.mount('#app')
