import { createRouter, createWebHashHistory } from "vue-router"
import Accueil from "./views/Index.vue"

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: Accueil
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router