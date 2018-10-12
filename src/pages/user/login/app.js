import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.css'
import App from './app.vue'
import AppUser from '@/appuser.js'

if(AppUser.isLogin()){
	location.assign('/customer/home.html');
}
Vue.use(ElementUI)

new Vue({
	el: '#app',
	render: h => h(App)
})
