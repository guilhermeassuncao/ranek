<template>
    <div v-if="vendas">
        <h2 class="sales-title">Vendas</h2>
        <div class="sales-wrapper" v-for="(venda, index) in vendas" :key="index">
            <ProdutoItem v-if="venda.produto" :produto="venda.produto">
                <p class="sales-name"><span>Comprador: </span> {{ venda.comprador_id }}</p>
            </ProdutoItem>
            <div class="sales-delivery">
                <h3>Entrega</h3>
                <ul v-if="venda.endereco">
                    <li v-for="(value, key) in venda.endereco" :key="key">{{ key }}: {{ value }}</li>
                </ul>
            </div>
        </div>
    </div>
    <PaginaCarregando v-else />
</template>

<script>
import ProdutoItem from '@/components/ProdutoItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
    name: 'UsuarioVenda',
    components: {
        ProdutoItem,
    },
    computed: {
        ...mapState(['usuario', 'login']),
    },
    data() {
        return {
            vendas: null,
        };
    },
    methods: {
        getVendas() {
            api.get(`/transacao?tipo=vendedor_id`).then((response) => {
                this.vendas = response.data;
            });
        },
    },
    watch: {
        login() {
            this.getVendas();
        },
    },
    created() {
        document.title = 'Vendas - Usuário - Ranek';

        if (this.login) {
            this.getVendas();
        }
    },
};
</script>

<style scoped>
.sales-title {
    margin-bottom: 30px;
}

.sales-wrapper {
    margin-bottom: 40px;
}

.sales-name span {
    color: #e80;
    font-weight: bold;
}

.sales-delivery {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    gap: 20px;
    margin-bottom: 60px;
}

.sales-delivery h3 {
    margin: 0;
}

@media screen and (max-width: 500px) {
    .sales-delivery {
        grid-template-columns: 1fr;
        gap: 10px;
    }
}
</style>
