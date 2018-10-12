import Vue from 'vue'
import App from './app.vue'
import AppUser from '@/appuser.js'

AppUser.logout();
location.assign('/user/login.html');