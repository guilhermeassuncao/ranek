<template>
    <form class="add-product">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" v-model="produto.nome" />

        <label for="preco">Preço (R$)</label>
        <input type="number" name="preco" id="preco" v-model="produto.preco" />

        <label for="fotos">Fotos</label>
        <input type="file" name="fotos" id="fotos" ref="fotos" multiple />

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
            const form = new FormData();

            const files = this.$refs.fotos.files;

            for (let i = 0; i < files.length; i++) {
                form.append(files[i].name, files[i]);
            }

            form.append("nome", this.produto.nome);
            form.append("preco", this.produto.preco);
            form.append("descricao", this.produto.descricao);
            form.append("vendido", this.produto.vendido);
            form.append("usuario_id", this.$store.state.usuario.id);

            return form;
        },
        async adicionarProduto(event) {
            const button = event.currentTarget;
            button.value = "Adicionando...";
            button.setAttribute("disabled", "");

            const produto = this.formatarProduto();

            await api.post("/produto", produto);
            await this.$store.dispatch("getUsuarioProdutos");

            button.value = "Adicionar Produto";
            button.removeAttribute("disabled");

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
