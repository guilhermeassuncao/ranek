import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Produto from "../views/Produto.vue";
import Login from "../views/Login.vue";
import Usuario from "../views/usuario/Usuario.vue";
import UsuarioProduto from "../views/usuario/UsuarioProduto.vue";
import UsuarioVenda from "../views/usuario/UsuarioVenda.vue";
import UsuarioCompra from "../views/usuario/UsuarioCompra.vue";
import UsuarioEditar from "../views/usuario/UsuarioEditar.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/usuario",
        component: Usuario,
        meta: {
            login: true,
        },
        children: [
            {
                path: "",
                name: "Usuario",
                component: UsuarioProduto,
            },
            {
                path: "compras",
                name: "Compras",
                component: UsuarioCompra,
            },
            {
                path: "vendas",
                name: "Vendas",
                component: UsuarioVenda,
            },
            {
                path: "editar",
                name: "Usuario-Editar",
                component: UsuarioEditar,
            },
        ],
    },
    {
        path: "/produto/:id",
        name: "Produto",
        component: Produto,
        props: true,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.login)) {
        if (!window.localStorage.token) {
            next("/login");
        } else {
            next();
        }
    }
    else{
        next();
    }
});

export default router;
