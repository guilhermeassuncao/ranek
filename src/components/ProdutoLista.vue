<template>
    <section class="produto-lista-container">
        <div v-for="produto in produtos" :key="produto.id">
            <img v-if="produtos.fotos" :src="produto.fotos[0].src" alt="produto.fotos[0].titulo" />
            <p class="produto-lista-preco">{{ produto.preco }}</p>
            <h2 class="produto-lista-titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
        </div>
    </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";

export default {
    name: "ProdutoLista",
    data() {
        return {
            produtos: null,
            produtosPorPagina: 9
        };
    },
    computed: {
        url() {
            const query = serialize(this.$route.query);

            return `/produto?_limit=${this.produtosPorPagina}${query}`;
        }
    },
    methods: {
        getProdutos() {
            api.get(this.url).then((response) => {
                this.produtos = response.data;
            });
        },
    },
    watch: {
        url () {
            this.getProdutos();
        }
    },
    created() {
        this.getProdutos();
    },
};
</script>

<style></style>
