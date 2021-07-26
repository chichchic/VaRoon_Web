import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/view/Main.vue";
import LoginManager from "@/view/LoginManager.vue";
import Home from '@/view/Home.vue';
import MarketManager from '@/view/MarketManager.vue';
import SellerManager from '@/view/SellerManager.vue';
import PatientCenter from '@/view/PatientCenter.vue';
import DoctorCenter from '@/view/DoctorCenter.vue';
import Manager from '@/view/Manager.vue';
import MypageManager from '@/view/MypageManager.vue';
import Error404 from '@/view/Error404.vue';

import store from '../store'

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    const loginPath = `/loginManager?rPath=${encodeURIComponent(to.path)}`; //이전 페이지가 어딘지 기억
    store.getters.isAuth ? next() : next(loginPath);
};

const mainHome = (to, from, next) => {
    store.getters.isAuth ? next() : next('/main')
}

const router = new VueRouter({
    mode: "hash",
    base: '/VaRoon_Web/',
    routes: [{
            path: "/main",
            component: Main
        },
        {
            path: "/loginManager",
            component: LoginManager
        },
        {
            path: "/",
            component: Home,
            beforeEnter: mainHome
        },
        {
            path: "/MarketManager",
            component: MarketManager
            ,beforeEnter: requireAuth
        },
        {
            path: "/SellerManager",
            component: SellerManager
            ,beforeEnter: requireAuth
        },
        {
            path: "/PatientCenter",
            component: PatientCenter
            ,beforeEnter: requireAuth
        },
        {
            path: "/DoctorCenter",
            component: DoctorCenter
            ,beforeEnter: requireAuth
        },
        {
            path: "/Manager",
            component: Manager
        },
        {
            path: "/MypageManager",
            component: MypageManager
            ,beforeEnter: requireAuth
        },
        {
            path: "*",
            component: Error404
        }
    ]
});

export default router;