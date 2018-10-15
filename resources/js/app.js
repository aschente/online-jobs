
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import routes from './routes';
import StoreData from "./store";
import MainApp from './components/MainApp.vue';

require('./bootstrap');

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VeeValidate);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next({
        name: 'find-work',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


//Global components
Vue.component('alert', require('./components/general/Alert.vue'))

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    },
});
