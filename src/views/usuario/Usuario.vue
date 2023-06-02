<template>
    <section class="user">
        <nav class="user-sidenav">
            <ul>
                <li>
                    <router-link :to="{ name: 'Usuario' }"> Produtos </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Compras' }"> Compras </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Vendas' }"> Vendas </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Usuario-Editar' }"> Editar Usuário </router-link>
                </li>
                <li>
                    <button @click.prevent="deslogar">Deslogar</button>
                </li>
            </ul>
        </nav>
        <transition mode="out-in">
            <router-view> </router-view>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'Usuario',
    methods: {
        deslogar() {
            this.$store.dispatch('deslogarUsuario');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.user {
    display: grid;
    grid-template-columns: minmax(140px, 200px) 1fr;
    max-width: 1000px;
    margin: 40px auto;
    gap: 30px;
    padding: 20px;
}

@media screen and (max-width: 500px) {
    .user {
        grid-template-columns: 1fr;
        margin: 0 auto;
    }
}

.user-sidenav a,
.user-sidenav button {
    padding: 10px;
    display: block;
    background: #f4f7fc;
    margin-bottom: 10px;
    border-radius: 4px;
}

.user-sidenav a.router-link-exact-active,
.user-sidenav a:hover,
.user-sidenav button:hover {
    background: #87f;
    color: white;
}

.user-sidenav button {
    border: none;
    width: 100%;
    font-size: 1rem;
    text-align: left;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    cursor: pointer;
}
</style>
