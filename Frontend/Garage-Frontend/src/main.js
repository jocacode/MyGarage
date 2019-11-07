import Vue from 'vue'
//import App from './App.vue'
import Home from './pages/Home'
//import Login from './pages/Login'
//import Register from './pages/Register'
import router from './routes'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

export const vue = new Vue({
  router,
  render: h => h(Home),
}).$mount('#app')
