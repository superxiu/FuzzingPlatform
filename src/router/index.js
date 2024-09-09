import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Admin from '../views/Admin.vue';
import Upload from '../views/Upload.vue';
import FuzzingTest from '../views/FuzzingTest.vue';
import Register from "@/views/Register.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/dashboard', component: Dashboard},
    {path: '/admin', component: Admin},
    {path: '/upload', component: Upload},
    {path: '/fuzzing-test', component: FuzzingTest}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
