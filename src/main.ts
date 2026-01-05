import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import ToastPlugin from 'vue-toast-notification'

// app and router
import App from './App.vue'
import router from './router'

// plugins
import vuetify from './plugins/vuetify'

// styles
import './assets/main.css'
import 'vue-toast-notification/dist/theme-default.css'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(ToastPlugin)
app.use(i18n)
app.use(router)
app.use(vuetify)
app.mount('#app')
