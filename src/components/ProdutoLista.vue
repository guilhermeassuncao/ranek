<template>
    <section class="product-container">
        <transition mode="out-in">
            <div v-if="produtos && produtos.length" class="product-list" key="1">
                <div v-for="(produto, index) in produtos" :key="index" class="product-list-item">
                    <router-link :to="{ name: 'Produto', params: { id: produto.id } }">
                        <img v-if="produto.fotos" :src="produto.fotos[0].src" alt="produto.fotos[0].titulo" class="product-list-item-img" />
                        <p class="product-list-item-preco">{{ produto.preco | numeroPreco }}</p>
                        <h2 class="product-list-item-titulo">{{ produto.nome }}</h2>
                        <p>{{ produto.descricao }}</p>
                    </router-link>
                </div>
                <ProdutoPaginacao :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina" />
            </div>
            <div v-else-if="produtos && produtos.length === 0" key="2">
                <p class="product-list-no-results">Nenhum resultado encontrado. Tente novamente!</p>
            </div>
            <PaginaCarregando v-else key="3" />
        </transition>
    </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
import ProdutoPaginacao from "@/components/ProdutoPaginacao.vue";

export default {
    name: "ProdutoLista",
    components: {
        ProdutoPaginacao,
    },
    data() {
        return {
            produtos: null,
            produtosPorPagina: 3,
            produtosTotal: 0,
        };
    },
    computed: {
        url() {
            const query = serialize(this.$route.query);

            return `/produto?_limit=${this.produtosPorPagina}${query}`;
        },
    },
    methods: {
        getProdutos() {
            this.produtos = null;

            api.get(this.url).then((response) => {
                this.produtosTotal = Number(response.headers["x-total-count"]);
                this.produtos = response.data;
            });
        },
    },
    watch: {
        url() {
            this.getProdutos();
        },
    },
    created() {
        this.getProdutos();
    },
};
</script>

<style scoped>
.product-container {
    max-width: 1000px;
    margin: 0 auto;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin: 30px;
}

@media screen and (max-width: 500px) {
    .product-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin: 10px;
    }
}

.product-list-item {
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    padding: 10px;
    background: white;
    border-radius: 4px;
    transition: all 0.2s;
}

.product-list-item:hover {
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
    transform: scale(1.1);
    position: relative;
    z-index: 1;
}

.product-list-item-img {
    border-radius: 4px;
    margin-bottom: 20px;
}

.product-list-item-titulo {
    margin-bottom: 20px;
}

.product-list-item-preco {
    font-weight: bold;
    color: #e80;
    margin-bottom: 10px;
}

.product-list-no-results {
    text-align: center;
    margin-top: 2rem;
}
</style>
