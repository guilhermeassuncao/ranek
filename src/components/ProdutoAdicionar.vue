<template>
    <form class="add-product">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" v-model="produto.nome" />

        <label for="preco">Preço (R$)</label>
        <input type="number" name="preco" id="preco" v-model="produto.preco" />

        <label for="fotos">Fotos</label>
        <input type="file" name="fotos" id="fotos" red="fotos" />

        <label for="descricao">Nome</label>
        <textarea name="descricao" id="descricao" v-model="produto.descricao"></textarea>

        <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto" />
    </form>
</template>

<script>
import { api } from "@/services.js";

export default {
    name: "ProdutoAdicionar",
    data() {
        return {
            produto: {
                nome: "",
                preco: "",
                descricao: "",
                fotos: null,
                vendido: "false",
            },
        };
    },
    methods: {
        formatarProduto() {
            this.produto.usuario_id = this.$store.state.usuario.id;
        },
        adicionarProduto() {
            this.formatarProduto();

            api.post("/produto", this.produto).then(() => {
                this.$store.dispatch("getUsuarioProdutos");
            });
        },
    },
};
</script>

<style scoped>
.add-product {
    display: grid;
    margin-bottom: 60px;
}
</style>
