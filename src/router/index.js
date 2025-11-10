import { createRouter, createWebHashHistory } from "vue-router"
import IndexView from "@/router/views/IndexView.vue"
import LoginView from "@/router/views/login/LoginView.vue"
import RegisterView from '@/router/views/login/RegisterView.vue'
import ForgotPasswordView from '@/router/views/login/ForgotPasswordView.vue'
import CatalogView from "@/router/views/catalog/CatalogView.vue"
import ProfileView from "@/router/views/user/ProfilView.vue"

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: IndexView
    },
    {
        path: '/login',
        name: 'Connexion',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Creation de compte',
        component: RegisterView
    },
    {
        path: '/forgot',
        name: 'Récupération du mot de passe',
        component: ForgotPasswordView
    },
    {
        path: '/catalog',
        name: 'Cathalogue',
        component: CatalogView
    },
    {
        path: '/profil',
        name: 'Profil',
        component: ProfileView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router