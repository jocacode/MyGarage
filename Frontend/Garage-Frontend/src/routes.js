import Vue from 'vue';
import Login from './pages/Login'
import Register from './pages/Register'
import Router from 'vue-router'
//import { getUserID } from './services/functions';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})

// router.beforeEach((to, from, next) => {

//     const pom = true;
//     if(pom){
//         next('/login');
//     }
//     else{
//         next('/login');
//     }
// })

export default router