import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

const app = createApp(App)

// Use router
app.use(router)

// Register Header globally
app.component('AppHeader', Header)
app.component('AppFooter', Footer)

app.mount('#app')
