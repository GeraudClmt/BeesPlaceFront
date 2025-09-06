import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives,
})
createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
