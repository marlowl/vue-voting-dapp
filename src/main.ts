import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { bootstrapPlugin } from 'bootstrap-vue-next'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(bootstrapPlugin)
app.mount('#app')
