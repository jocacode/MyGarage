import Vue from 'vue';
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Router from 'vue-router'
import { getAccessToken} from '../services/contextManagement';
//import { getUserID } from './services/functions';

Vue.use(Router)

const router = new Router({
    mode: 'history',
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
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '*',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {

    const LoggegIn = getAccessToken() != null;
    const publicPages = ['/login', '/register'];
    const isPagePrivate = publicPages.indexOf(to.path) == -1
    if(LoggegIn && !isPagePrivate)
        next("/home");
    else if (!LoggegIn && isPagePrivate)
        next("/login");
    else
        next();

});

export default router