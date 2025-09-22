import { createRouter, createWebHashHistory } from "vue-router"
import Accueil from "@/router/views/Index.vue"
import Login from "@/router/views/login/Login.vue"
import Register from '@/router/views/login/Register.vue'
import ForgotPassword from '@/router/views/login/ForgotPassword.vue'
import Catalog from "@/router/views/catalog/Catalog.vue"
import Profile from "@/router/views/user/Profil.vue"

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
    },
    {
        path: '/register',
        name: 'Creation de compte',
        component: Register
    },
    {
        path: '/forgot',
        name: 'Récupération du mot de passe',
        component: ForgotPassword
    },
    {
        path: '/catalog',
        name: 'Cathalogue',
        component: Catalog
    },
    {
        path: '/profil',
        name: 'Profil',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router