import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import UserProfile from '../views/UserProfile'
import Admin from '../views/Admin'
import users from '../assets/users'
// more old version approach
// composition api approach in App.vue
import store from '../store'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/user/:userId', name: 'UserProfile', component: UserProfile },
    { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAdmin: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach( async (to, from, next) => {
    const user = store.state.User.user

    if(!user) {
        // use dispatch to call actions
        await store.dispatch('User/setUser', users[0]) // with modules
        //await store.dispatch('setUser', users[0]) // without modules
    }

    const isAdmin = false
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

    if(requiresAdmin && !isAdmin) next({ name: 'Home' })
    else next()
})

export default router