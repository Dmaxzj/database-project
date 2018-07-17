import Vue from 'vue'
import VueRouter from 'vue-router'

import ItemContainer from './ItemContainer.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import UserInfo from './UserInfo.vue'
import AddWork from './AddWork.vue'
import ItemDetials from './ItemDetials.vue'

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
            path: '/likes',
            component: ItemContainer,
            children: [{
                path: ':id',
                component: ItemDetials
            }]
        },
        {
            path: '/search',
            component: ItemContainer,
            children: [{
                path: ':id',
                component: ItemDetials
            }]
        },
        {
            path: '/works',
            component: ItemContainer,
            children: [{
                path: ':id',
                component: ItemDetials
            }]
        },
        {   
            path: '*',
            redirect: '/works'
        }
    ]

})