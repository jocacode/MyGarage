import Vue from 'vue'
import App from './App.vue'
//import Login from './pages/Login'
import router from './routes/routes'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false

export const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
