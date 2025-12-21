import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'

const app = createApp(App)

// Use router
app.use(router)

// Register Header globally
app.component('AppHeader', Header)

app.mount('#app')
