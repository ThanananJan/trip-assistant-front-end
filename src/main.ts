import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

import './asset/css/material_icon.css'
import { createPinia } from 'pinia'
import piniapluginPersistedsState from 'pinia-plugin-persistedstate'

const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()
pinia.use(piniapluginPersistedsState)

// Use plugins
app.use(stores)
app.use(router)
app.use(i18n)
app.use(pinia)
app.use(createVuestic({ config: vuesticGlobalConfig }))

app.mount('#app')
