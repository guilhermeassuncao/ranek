<template>
    <div v-if="compras">
        <h2 class="purchases-title">Compras</h2>
        <div class="purchases-wrapper" v-for="(compra, index) in compras" :key="index">
            <ProdutoItem v-if="compra.produto" :produto="compra.produto">
                <p class="purchases-name"><span>Vendedor: </span> {{ compra.vendedor_id }}</p>
            </ProdutoItem>
        </div>
    </div>
    <PaginaCarregando v-else />
</template>

<script>
import ProdutoItem from '@/components/ProdutoItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
    name: 'UsuarioCompra',
    components: {
        ProdutoItem,
    },
    computed: {
        ...mapState(['usuario', 'login']),
    },
    data() {
        return {
            compras: null,
        };
    },
    methods: {
        getCompras() {
            api.get(`/transacao?tipo=comprador_id`).then((response) => {
                this.compras = response.data;
            });
        },
    },
    watch: {
        login() {
            this.getCompras();
        },
    },
    created() {
        document.title = 'Compras - Usuário - Ranek';

        if (this.login) {
            this.getCompras();
        }
    },
};
</script>

<style scoped>
.purchases-title {
    margin-bottom: 30px;
}

.purchases-wrapper {
    margin-bottom: 40px;
}

.purchases-name span {
    color: #e80;
    font-weight: bold;
}
</style>
