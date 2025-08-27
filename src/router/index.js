import { createRouter, createWebHashHistory } from "vue-router"
import Accueil from "@/router/views/Index.vue"
import Login from "@/router/views/login/Login.vue"

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: Accueil
    },
    {
        path: '/login',
        name: 'Connexion',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router