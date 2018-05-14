import Vue from 'vue'
import VueRouter from 'vue-router'

import ItemContainer from './ItemContainer.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import UserInfo from './UserInfo.vue'
import AddWork from './AddWork.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/user',
            component: UserInfo
        },
        {
            path: '/addwork',
            component: AddWork
        },
        {   
            path: '*',
            component: ItemContainer
        }
    ]

})