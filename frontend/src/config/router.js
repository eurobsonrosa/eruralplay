import Vue from "vue"
import VueRouter from "vue-router"


import AdminPages from "@/components/Admin/AdminPages"
import RoomById from '@/components/room/RoomById'
import Rooms from '@/components/room/RoomsGet'
import Auth from '@/components/auth/MyAuth'
import RoomForm from "@/components/room/RoomForm"
import PageNotFound from '@/components/templates/PageNotFound'
import { userKey } from "@/global"

Vue.use(VueRouter)

const routes = [
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requireAdmin: true }
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
},
{
    name: 'home',
    path: '/',
    component: Rooms
},
{
    name: 'roomById',
    path:'/rooms/:id',
    component: RoomById
},
{
    name: 'roomForm',
    path: '/room-form',
    component: RoomForm
},
{
    path: "*",
    component: PageNotFound
}
]

const router =  new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requireAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
